import { connect } from "@/dbconfig/connect";
import Notifications from "@/models/notificationModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { id } = req;

    const notifications = await Notifications.find({
      to: id,
      isAccepted: false,
    });

    if (notifications) {
      const response = NextResponse.json(notifications);
      return response;
    }

    const response = NextResponse.json("NICE");
    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ msg: "An error occurred" });
  }
}
