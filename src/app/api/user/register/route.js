import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // Connecting to the database
    await connect();

    // Getting user's details from the request body
    const { username, password, file } = await request.json();

    // Checking if the username is already taken
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        msg: "Username already taken",
      });
    }

    // Creating and saving the user
    const newUser = await User.create({
      username: username,
      password: password,
      avatar: file,
    });

    await newUser.save();

    const tokenData = {
      id: newUser._id,
      username: newUser.username,
      password: newUser.password,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

    // Use NextResponse.cookies instead of Response.cookies
    const response = NextResponse.json({
      success: true,
    });

    // Set a reasonable expiration time, for example, 7 days from now
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // Use NextResponse.json instead of Response.json
    return response;
  } catch (error) {
    // Use NextResponse.json instead of Response.json
    return NextResponse.json(
      { success: false, msg: "Something went wrong" },
      error.message
    );
  }
}
