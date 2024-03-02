import { connect } from "@/dbconfig/connect";
import DM from "@/models/dmModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { msg, sentTo, sentBy } = req;

    const message = await DM.create({
      message: msg,
      sentTo: sentTo,
      sentBy: sentBy,
    });

    const response = NextResponse.json(message);
    return response;
  } catch (e) {
    console.log(e);
    return Response.json({ msg: "an error occurred" });
  }
}
