import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const token = request.cookies.get("token")?.value || "";

  const path = request.nextUrl.pathname;

  if (!token && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (!token && path !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && path == "/login") {
    return NextResponse.redirect(new URL("/feed", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/feed", "/post/:path*","/post/" ,"/profile"],
};
