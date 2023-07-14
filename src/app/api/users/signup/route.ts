import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import Task from "@/models/task";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password  } = reqBody;
    // Check if all fields are provided
    if (!username || !email || !password) {
      // If any field is missing
      return NextResponse.json(
        { error: "Please enter all fields" },
        { status: 400 }
      );
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 } // 400 Bad Request
      );
    }
    // Create salt & hash
    const salt = await bcryptjs.genSalt(10); // Generate salt
    const hash = await bcryptjs.hash(password, salt); // Generate hash
    // Create new User
    const newUser = new User({
      username,
      email,
      password: hash, // Hashed password
    });
    // Save user and return response
    const savedUser = await newUser.save(); // Save user to database
    console.log(savedUser);
    await sendEmail({
      email: savedUser.email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        message: "User successfully registered",
        success: true,
        user: savedUser, // Don't send password in response
      },
      { status: 201 } // 201 Created
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
