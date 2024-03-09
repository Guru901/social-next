import { connect } from "@/dbconfig/connect";
import Notifications from "@/models/notificationModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connect();

    const req = await request.json();

    const { notificationType, from, to, notificationId } = req;

    if (notificationType === "friendAdd") {
      const fromUser = await User.findOne({ username: from });
      const toUser = await User.findById(to);

      if (!fromUser || !toUser) {
        return NextResponse.json({ msg: "User not found" });
      }

      if (toUser.friends.includes(fromUser._id.toString())) {
        return NextResponse.json({ msg: "Already friends" });
      }

      toUser.friends.push(fromUser._id);
      await toUser.save();

      fromUser.friends.push(toUser._id);
      await fromUser.save();

      const noitification = await Notifications.findById(notificationId);

      noitification.isAccepted = true;
      noitification.isSeen = true;

      await noitification.save();

      const updatedFriends = toUser.friends;
      return NextResponse.json(updatedFriends);
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ msg: "An error occurred" });
  }
}
