import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value || "";

  const path = request.nextUrl.pathname;

  if (!token) {
    if (path !== "/login" && path !== "/") {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else {
    if (path === "/login" || path === "/") {
      return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/feed",
    "/post/:path*",
    "/post/",
    "/profile",
    "/login",
    "/register",
    "/chat",
    "/search",
    "/change__password",
  ],
};
