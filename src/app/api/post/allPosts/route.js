import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { isPublic } = req;

    const posts = await Post.find({ isPublic: isPublic });
    const response = NextResponse.json(posts);
    return response;
  } catch (e) {
    console.log(e);
    return Response.json({ msg: "an error occurred" });
  }
}
