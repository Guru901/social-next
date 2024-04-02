import Topic from "@/models/topicModel";
import { NextResponse } from "next/server";

export async function POST() {
  const topics = await Topic.find({});

  const response = NextResponse.json(topics);

  return response;
}
