import { connect } from "@/dbconfig/connect";
import Comment from "@/models/commentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // connecting to the database
    await connect();

    // converting the request to json
    const req = await request.json();

    // finding the postid on the which the user is posting a comment finding the content of the comment and the user who is posting that comment
    const { comment, postID, user, avatar } = req;

    // creating the comment and saving it in the database
    const newComment = await Comment.create({
      text: comment,
      post: postID,
      user: user.username,
      avatar: avatar ? avatar : "",
    });

    await newComment.save();

    // sending the response of succes that the comment has been posted
    const response = NextResponse.json({ success: true });
    return response;
  } catch (error) {
    console.log(error);
  }
}
