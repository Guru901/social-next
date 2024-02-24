import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();
    const { id } = req;

    await Post.findOneAndDelete({ _id: id });

    const response = NextResponse.json({ success: true });

    return response;
  } catch (error) {
    console.log(error);
    // It's a good practice to return an error response in case of failure
  }
}
