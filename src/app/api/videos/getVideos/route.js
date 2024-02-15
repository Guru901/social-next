import { connect } from "@/dbconfig/connect";
import Videos from "@/models/shortVidModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const videos = await Videos.find({});

  const response = NextResponse.json(videos);
  return response;
}
