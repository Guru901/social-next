import { connect } from "@/dbconfig/connect";
import Topic from "@/models/topicModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const req = await request.json();

  const { createdBy, title } = req;

  await Topic.create({
    name: title,
    createdBy: createdBy,
  });

  const response = NextResponse.json({ msg: "Created" });

  return response;
}
