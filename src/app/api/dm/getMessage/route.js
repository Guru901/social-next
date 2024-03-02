import { connect } from "@/dbconfig/connect";
import DM from "@/models/dmModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const req = await request.json();

    const { sentTo, sentBy } = req;

    const messages = await DM.find({ sentBy: sentBy, sentTo: sentTo });

    const response = NextResponse.json(messages);
    return response;
  } catch (e) {
    console.log(e);
    return Response.json({ msg: "an error occurred" });
  }
}
