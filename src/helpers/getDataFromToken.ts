import { Jwt } from "jsonwebtoken";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
   try {
      const token = request.cookies.get("token")?.value || "";
      if (!token) {
         return null;
      }
      const tokenData:any = jwt.verify(token, process.env.TOKEN_SECRET!) as Jwt;
      return tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
}
}