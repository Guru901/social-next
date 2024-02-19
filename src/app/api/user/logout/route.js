import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ msg: "Error logging out" });
  }
}
