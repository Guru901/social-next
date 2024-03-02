import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { id } = req;

    const user = await User.findById(id).select("-password");

    const response = NextResponse.json(user);

    return response;
  } catch (error) {
    console.log(error);
  }
}
