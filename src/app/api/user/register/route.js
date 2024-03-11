import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connect();

    const { username, password, file } = await request.json();
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        msg: "Username already taken",
      });
    }

    const newUser = await User.create({
      username: username,
      password: password,
      avatar: file,
    });

    await newUser.save();

    const tokenData = {
      username: newUser.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

    const response = NextResponse.json({
      success: true,
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message
    );
  }
}
