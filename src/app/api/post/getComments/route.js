import Comment from "@/models/commentModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // connecting to the database
    await connect();

    // converting the request to json
    const req = await request.json();

    // getting the post id from the request
    const { postID } = req;

    // finding comments related to that id
    const comments = await Comment.find({ post: postID });

    // sending the comments
    const response = NextResponse.json(comments);
    return response;
  } catch (error) {
    console.log(error);
  }
}
