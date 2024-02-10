import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // connecting to the database
    await connect();

    // converting the request to json
    const req = await request.json();

    // getting the title body and image of the post
    const { title, body, image } = req;

    // creating and saving the post in database
    const newPost = await Post.create({
      title: title,
      body: body,
      image: image,
    });
    await newPost.save();

    // sending the response to user
    const response = NextResponse.json({
      success: true,
    });

    return response;
  } catch (error) {}
}
