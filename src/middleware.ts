import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  const pathName = request.nextUrl.pathname;

  // 로그인된 유저만 접근 가능

  if (pathName.match(/^\/user|^\/admin/) && !session)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));

  // 어드민 유저만 접근 가능
  // @ts-ignore
  if (pathName.startsWith("/admin") && session?.user?.role !== "Admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 된 유저는, 회원가입 페이지에 접근 X
  if (pathName.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
