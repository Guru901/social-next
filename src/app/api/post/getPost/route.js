import Post from "@/models/postModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { id, selectedOption } = req;

    if (selectedOption === "publicPosts") {
      const posts = await Post.find({ user: id, isPublic: true }).select(
        "image"
      );
    } else {
      const posts = await Post.find({ user: id, isPublic: false }).select(
        "image"
      );
    }

    const response = NextResponse.json(posts);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
