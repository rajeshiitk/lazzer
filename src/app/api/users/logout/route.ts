import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";



connectMongoDB();
 //logout User
export async function GET(){
    try {
       const response = NextResponse.json({message:"User successfully logged out", success:true})
       //success:true means user is logged out
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)}) // Set token cookie to empty string and expires to 0
        //httpOnly:true means cookie can only be accessed by server
        return response;

        
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500}) // 500 Internal Server Error
        
    }
}