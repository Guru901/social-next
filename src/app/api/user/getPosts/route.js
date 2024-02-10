import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const req = await request.json();

  const { user, isPublic } = req;

  const posts = await Post.find({ user: user, isPublic: isPublic });

  const response = NextResponse.json(posts);
  return response;
}
