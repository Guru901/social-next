import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const req = await request.json();

    const { title, body, image, user, username, isPublic } = req;

    const newPost = await Post.create({
      title: title,
      body: body,
      image: image,
      user: user,
      username: username,
      isPublic: isPublic,
    });
    await newPost.save();

    const response = NextResponse.json({
      success: true,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}
