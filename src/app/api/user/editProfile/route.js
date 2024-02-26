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

    const { oldPass, newPass } = req;

    if (oldPass !== user.password) {
      const response = NextResponse.json({
        msg: "Old password does not match.",
        success: false,
      });
      return response;
    }

    user.password = newPass;

    await user.save();

    const response = NextResponse.json({
      success: true,
      msg: "Password updated successfully.",
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
