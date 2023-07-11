import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



connectMongoDB();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
    const {email, password} = reqBody;
    // Check if all fields are provided
    if(!email || !password){
        // If any field is missing
        return {error: "Please enter all fields"};
    }
    // Check if user already exists
    const user  = await User.findOne({email});
    if(!user){
         return NextResponse.json({error: "User with this email does not exist"}, {status: 400}); // 400 Bad Request
    } 
    // Check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
        return NextResponse.json({error: "Invalid credentials"}, {status: 400}); // 400 Bad Request
    }
    //create tokenData
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: 24*3600}); // 1 hour
    
    // create resopnse
    const response = NextResponse.json({
        message: "User successfully logged in",
        success: true,
    })
   
    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });
   // Return response it will be sent to client
    return response;

    // Return response
    // return NextResponse.json({message: "User successfully logged in", success: true, user: user}, {status: 200}); // 200 OK

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }

}