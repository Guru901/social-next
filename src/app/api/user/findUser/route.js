import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();
    const { user } = req;

    const usernameRegex = new RegExp(user, "i");

    const users = await User.find({ username: { $regex: usernameRegex } });

    const response = NextResponse.json({ users });

    return response;
  } catch (error) {
    console.log(error);
  }
}
