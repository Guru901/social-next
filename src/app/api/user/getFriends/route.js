import Friends from "@/app/friends/page";
import { connect } from "@/dbconfig/connect";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    connect();

    const req = await request.json();
    const { loggedInUser } = req;

    const user = await User.findById(loggedInUser);

    const friends = user.friends;

    const friendsDetails = await Promise.all(
      friends.map(async (x) => {
        const friend = await User.findById(x);
        return friend;
      })
    );

    const response = NextResponse.json(friendsDetails);

    return response;
  } catch (error) {
    console.log(error);

    const response = NextResponse.json("NICE");

    return response;
  }
}
