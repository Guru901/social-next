import { connect } from "@/dbconfig/connect";
import Topic from "@/models/topicModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const req = await request.json();

  const { createdBy, topic } = req;

  await Topic.create({
    name: topic,
    createdBy: createdBy,
  });

  const response = NextResponse.json({ msg: "Created" });

  return response;
}
