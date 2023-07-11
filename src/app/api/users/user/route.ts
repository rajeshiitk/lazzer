import { connectMongoDB } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";


connectMongoDB();

export async function GET(request:NextRequest){
    try {
        // Get user id from token
        const userId = await getDataFromToken(request);
        if(!userId){
            return NextResponse.json({error: "Unauthorized"}, {status: 401}); // 401 Unauthorized
        }
        // Get user from database
        const user = await User.findOne({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404}); // 404 Not Found
        }
        // Return response
        return NextResponse.json({message:"User Found",success: true, userData: user}, {status: 200}); // 200 OK


        
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500}); //NextResponse.json({error: error.message}, {status: 500}) means that we are sending json response with error message and status code 500

        
    }
}