import Task from "@/models/task";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectMongoDB();
//api route for simple todo app
export async function POST(request: NextRequest) {
  try {
    // get userId from token
    const userId = await getDataFromToken(request);
    // Check if userId is  provided
    if (!userId) {
      // if userId is missing
      return NextResponse.json({ error: "Missing user Id" }, { status: 400 }); // 400 Bad Request
    }

    const reqBody = await request.json();
    const { title, description, status } = reqBody;
    // Check if all fields are provided
    if (!title || !description || !status) {
      // If any field is missing
      return NextResponse.json(
        { error: "Please enter all fields" },
        { status: 400 }
      ); // 400 Bad Request
    }
    // Check if task already exists
    const task = await Task.findOne({ title });
    if (task) {
      return NextResponse.json(
        { error: "Task with this title already exists" },
        { status: 400 }
      ); // 400 Bad Request
    }
    // create new task
    const newTask = new Task({
      title,
      description,
      status,
    });
    // save task
    const saved = await newTask.save();
    console.log(newTask);
    // save taskid to user

    const newUser = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask._id } },
      { new: true }
    );
    console.log(newUser);
    if (!newUser) {
      return NextResponse.json(
        { error: "User with this Id does not exist" },
        { status: 400 }
      ); // 400 Bad Request
    }

    //send response
    return NextResponse.json(
      { message: "Task successfully added", success: true, task: newTask },
      { status: 200 }
    ); // 200 OK
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// similar route for get request
export async function GET(request: NextRequest) {
  try {
    // get userId from token
    const userId = getDataFromToken(request);
    // Check if userId is  provided
    console.log(userId);
    if (!userId) {
      // if userId is missing
      return NextResponse.json({ error: "Missing user Id" }, { status: 400 }); // 400 Bad Request
    }
    // get user
    const user = await User.findById(userId).populate("tasks");
    // console.log(user);
    // send response
    return NextResponse.json(
      {
        message: "Tasks successfully fetched",
        success: true,
        tasks: user.tasks,
      },
      { status: 200 }
    ); // 200 OK
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
