import { connectMongoDB } from "@/dbConfig/dbConfig";

import {  NextResponse } from "next/server";




connectMongoDB();
 //logout User
export async function GET(){
    try {
        // const resp = NextResponse.next();
       const response = NextResponse.json({message:"User successfully logged out", success:true})
       // delete token cookie

       //success:true means user is logged out
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)}) // Set token cookie to empty string and expires to 0
        //httpOnly:true means cookie can only be accessed by server
        // resp.cookies.delete("token"); // delete token cookie

        // stop caching of response 
        response.headers.set("Cache-Control", "no-store"); // Stop caching of response
        return response;
        // destroy cookie
        

        
    } catch (error: any) {
        return NextResponse.json({error:error.message},{status:500}) // 500 Internal Server Error
        
    }
}