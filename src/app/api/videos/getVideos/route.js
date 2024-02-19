import { connect } from "@/dbconfig/connect";
import Videos from "@/models/shortVidModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const videos = await Videos.find({});

    const response = NextResponse.json(videos);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error fetching videos" });
  }
}
