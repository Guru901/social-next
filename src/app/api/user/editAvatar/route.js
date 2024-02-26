import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken.id);

    const req = await request.json();

    const { avatar } = req;

    user.avatar = avatar;

    await user.save();

    const response = NextResponse.json({
      success: true,
      msg: "Avatar Changed Succesfully.",
    });
    return response;
  } catch (error) {
    console.error(error);
    const response = NextResponse.json(
      { error: "Password update failed." },
      { status: 500 }
    );
    return response;
  }
}
