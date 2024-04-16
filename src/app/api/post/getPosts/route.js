import Post from "@/models/postModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const posts = await Post.find({});

    const response = NextResponse.json(posts);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error occured" });
  }
}
