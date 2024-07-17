import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("session", session);
  const jwt = request.cookies.get("authjs.session-token")?.value;
  if (!jwt)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
}

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
