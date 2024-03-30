import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const req = await request.json();

  const { user } = req;

  if (!user) {
    const response = NextResponse.json({ msg: "LOGIN FIRST" });
    return response;
  }

  const loggedInUser = await User.findById(user);

  const friends = loggedInUser.friends;

  const posts = [];

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];

    const post = await Post.find({ user: friend, topic: "general" });

    for (let p = 0; p < post.length; p++) {
      posts.push(post[p]);
    }
  }

  const response = NextResponse.json({ posts });

  return response;
}
