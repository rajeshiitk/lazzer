import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/dbConfig/dbConfig";

connectMongoDB();

export async function POST(request: NextRequest) {
       try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);
        if(!token){
            return NextResponse.json({error: "Please provide token"}, {status: 400});
        }

        else{
            const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}});
            console.log("user", user);
            if(!user){
                return NextResponse.json({error: "Invalid token"}, {status: 400});
            }
            else{
                user.isVerified = true;
                user.verifyToken = undefined;
                user.verifyTokenExpiry = undefined;
                await user.save();
                return NextResponse.json({message: "User successfully verified", success: true}); 
            }
            
        }

        
       } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
        
       }
}