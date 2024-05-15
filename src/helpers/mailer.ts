import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hashed token
    const token = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 24 * 3600 * 1000, // 24 hours
      });
    }

    //create transporter using gmail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    // //create transporter
    // const transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //       // TODO: add to env file
    //     user: "f344ece9468556",
    //     pass: "b83b52753b45d5"
    //   }
    // });
    // //create mailOptions
    const mailOptions = {
      from: "rtsphysic.18@gmail.com",
      to: email,
      subject: `${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset password"
      }}`,
      html: `
                <h1>${
                  emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset password"
                }</h1>
                <p>Click on the link below to ${
                  emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
                }</p>
                <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${token}">${
        emailType === "VERIFY" ? "Verify Email" : "Reset Password"
      }</a>
                or copy and paste the link below in your browser
                ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${token}
                `,
    };
    //send email
    const response = await transport.sendMail(mailOptions);
    //return response
    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });

    //create transporter
    // const transporter = nodeMailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });
    // //create mailOptions
    // const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: email,
    //     subject: "Email verification",
    //     html: `
    //     <h1>Email verification</h1>
    //     <p>Click on the link below to verify your email</p>
    //     <a href="${process.env.CLIENT_URL}/verify-email/${token}">Verify Email</a>
    //     `
    // }
    // //send email
    // await transporter.sendMail(mailOptions);
    // //return response
    // return {message: "Email sent successfully", success: true};
  } catch (error: any) {
    throw new Error(error.message);
  }
};
