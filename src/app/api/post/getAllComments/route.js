import Comment from "@/models/commentModel";
import { connect } from "@/dbconfig/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const comments = await Comment.find();
    const response = NextResponse.json(comments);
    return response;
  } catch (error) {
    console.log(error);
  }
}
