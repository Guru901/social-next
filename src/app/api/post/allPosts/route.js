import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    let { keyWord } = req;

    if (!keyWord) {
      keyWord = "general";
    }

    const posts = await Post.find({
      isPublic: true,
      topic: keyWord.toLowerCase() || "",
    });
    const response = NextResponse.json(posts);
    return response;
  } catch (e) {
    console.log(e);
    return Response.json({ msg: "an error occurred" });
  }
}
