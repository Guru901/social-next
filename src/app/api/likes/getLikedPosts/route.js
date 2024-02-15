import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();
  const req = await request.json();
  const { id } = req;

  const post = await Post.find({
    likes: { $in: [id] },
    isPublic: true,
  });

  const response = NextResponse.json(post);

  return response;
}
