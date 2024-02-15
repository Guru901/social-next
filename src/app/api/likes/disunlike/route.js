import { connect } from "@/dbconfig/connect.js";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function PUT(request) {
  connect();

  const req = await request.json();

  const { id, user } = req;

  const post = await Post.findByIdAndUpdate(
    id,
    {
      $pull: { dislikes: user },
    },
    { new: true }
  );

  const response = NextResponse.json(post);

  return response;
}
