import Comment from "@/models/commentModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const req = await request.json();

    const { postID } = req;

    const comments = await Comment.find({ post: postID });

    const response = NextResponse.json(comments);

    return response;
  } catch (error) {
    console.log(error);
  }
}
