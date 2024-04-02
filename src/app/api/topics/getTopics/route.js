import { connect } from "@/dbconfig/connect";
import Topic from "@/models/topicModel";
import { NextResponse } from "next/server";

export async function POST() {
  connect();

  const topics = await Topic.find({});

  const response = NextResponse.json(topics);

  return response;
}
