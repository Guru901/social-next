import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken.id);

    const response = NextResponse.json(user);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
