import Post from "@/models/postModel";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    connect();

    const req = await request.json();

    const { id } = req;

    const posts = await Post.find({ user: id, isPublic: true }).select("image");

    const response = NextResponse.json({ posts });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
