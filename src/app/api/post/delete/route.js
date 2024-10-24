import { connect } from "@/dbconfig/connect";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import {} from "next-cloudinary";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();
    const { id } = req;

    await Post.findOneAndDelete({ _id: id });

    const response = NextResponse.json({ success: true });

    return response;
  } catch (error) {
    console.log(error);
  }
}
