import { connect } from "@/dbconfig/connect";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  connect();

  const req = await request.json();
  const {
    demandedThing,
    dislikedThing,
    likedThing,
    overallRating,
    user,
    somethingElse,
  } = req;

  const feedback = await Feedback.create({
    demandedThing: demandedThing,
    dislikedThing: dislikedThing,
    likedThing: likedThing,
    overallRating: overallRating,
    givenBy: user,
    somethingElse: somethingElse,
  });

  const response = NextResponse.json(feedback);

  return response;
}
