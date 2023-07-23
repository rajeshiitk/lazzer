import { getDataFromToken } from "@/helpers/getDataFromToken";
import Task from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest, params:{params:{taskId:string}} ){
    try {
      // get userId from token:
      const userId = getDataFromToken(request);
      if (!userId) {
        return NextResponse.json({ error: "Missing user Id" }, { status: 400 }); // 400 Bad Request
      }
    
        // get taskId from params
        console.log(params);
        const {taskId }= params.params;
      if (!taskId) {
        // if taskId is missing
        console.log(taskId);
        return NextResponse.json({ error: "Missing task Id" }, { status: 400 }); // 400 Bad Request
      }
      // get task
      const newTask = await Task.findById(taskId);
      // Check if task exists\
      if (!newTask) {
        // if task does not exist
        return NextResponse.json({ error: "Task does not exist" }, { status: 400 }); // 400 Bad Request
      }
    //   delete task
      const deletedTask = await Task.findByIdAndDelete(taskId);
      // delete task from user
      console.log(deletedTask);
      return NextResponse.json(
        { message: "Task successfully deleted", success: true, task: deletedTask },
        { status: 200 }
      ); // 200 OK
    
    } catch (error:any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
      
    }
   
  }
    
  


  export async function PUT(request:NextRequest, params:{params:{taskId:string}} ){
    try {
      // get userId from token:
      const userId = getDataFromToken(request);
      if (!userId) {
        return NextResponse.json({ error: "Missing user Id" }, { status: 400 }); // 400 Bad Request
      }
    

        const  task  = await request.json()
        console.log(task);
        // get taskId from params
        console.log(params);
        const {taskId }= params.params;
      if (!taskId) {
        // if taskId is missing
        console.log(taskId);
        return NextResponse.json({ error: "Missing task Id" }, { status: 400 }); // 400 Bad Request
      }
      // get task
      const newTask = await Task.findById(taskId);
      // Check if task exists\
      if (!newTask) {
        // if task does not exist
        return NextResponse.json({ error: "Task does not exist" }, { status: 400 }); // 400 Bad Request
      }
    // update task
    const updatedTask = await Task.findByIdAndUpdate(taskId,task , {
        new: true,  // return the updated task instead of the old one
        runValidators: true, // run mongoose validators against the update operation meaning that if the update operation tries to update the task with invalid data, the update operation will fail
        });
        // update task from user
        // console.log(updatedTask);
        return NextResponse.json(
        { message: "Task successfully updated", success: true, task: updatedTask },
        { status: 200 }
        ); // 200 OK


    
    } catch (error:any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
      
    }
   
  }
    
  