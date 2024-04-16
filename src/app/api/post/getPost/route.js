import Post from "@/models/postModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { id, selectedOption } = req;
    let posts;
    if (selectedOption) {
      if (selectedOption === "publicPosts") {
        posts = await Post.find({ user: id, isPublic: true }).select("image");
      } else {
        posts = await Post.find({ user: id, isPublic: false }).select("image");
      }
    } else {
      posts = await Post.find();
    }

    const response = NextResponse.json(posts);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
