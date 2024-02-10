import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
    });

    // deleting the token from the user's cookies
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  } catch (error) {}
}
