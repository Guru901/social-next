import { connect } from "@/dbconfig/connect";
import Comment from "@/models/commentModel";
import { NextResponse } from "next/server";
import { withOptions } from "tailwindcss/plugin";

export async function POST(request) {
  try {
    await connect();

    const req = await request.json();

    const { comment, postID, user, avatar } = req;

    const newComment = await Comment.create({
      text: comment,
      post: postID,
      user: user.username,
      avatar: avatar ? avatar : "",
    });
    await newComment.save();

    const response = NextResponse.json({ success: true });

    return response;
  } catch (error) {
    console.log(error);
  }
}
