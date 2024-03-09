import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import Notifications from "@/models/notificationModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { from, userId, type, fromAvatar } = req;

    await Notifications.create({
      from: from,
      to: userId,
      fromAvatar: fromAvatar,
      notificationType: type,
    });

    const response = NextResponse.json({
      success: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({
      success: false,
    });
    return response;
  }
}
