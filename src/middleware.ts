import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("authjs.session-token")?.value;
  if (!jwt)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
}

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
