// reset-password route.ts

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { connectMongoDB } from "@/dbConfig/dbConfig";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;
    if (!token || !password) {
      return NextResponse.json(
        { error: "Please provide token and password" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10); // Generate salt
    const hash = await bcryptjs.hash(password, salt); // Generate hash

    user.password = hash;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password successfully reset",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
