// forgot password route

import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connectMongoDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    if (!email) {
      return NextResponse.json(
        { error: "Please provide email" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User with this email does not exist" },
        { status: 400 }
      );
    }

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Reset password link sent to your email",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
