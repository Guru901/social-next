import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    connect();
    const req = await request.json();
    const { username, password } = req;

    const user = await User.findOne({ username: username });
    if (!user) {
      return Response.json({ success: false, msg: "User doesn't exists" });
    }

    if (user.password === password) {
      const tokenData = {
        id: user._id,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

      const response = NextResponse.json({
        success: true,
        user: user,
      });

      response.cookies.set("token", token, {
        httpOnly: true,
      });

      return response;
    }

    return response.json({ success: false, msg: "Incorrect Credentials" });
  } catch (error) {
    console.log(error);
    return Response.json({
      success: false,
      msg: "an error occurred",
    });
  }
}
