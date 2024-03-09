import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import Notifications from "@/models/notificationModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();

    const { loggedInUser, id } = req;

    const user = await User.findById(id);

    if (user.friends.includes(loggedInUser)) {
      const response = NextResponse.json({
        success: true,
      });
      return response;
    } else {
      const repsonse = NextResponse.json({
        success: false,
      });
      return repsonse;
    }
  } catch (error) {
    console.error(error);
    const response = NextResponse.json({
      success: false,
    });
    return response;
  }
}
