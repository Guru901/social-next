import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// export async function POST(request) {
//   try {

//     const user = await User.findOne({ username: decodedToken.username });

//     const response = NextResponse.json(user);

//     return response;
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "nice" });
//   }
// }

import { GetServerSidePropsContext } from "next";
import { connect } from "@/dbconfig/connect";

export async function POST(request) {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return null;
  }

  try {
    connect();

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId);

    const response = NextResponse.json(user);

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
