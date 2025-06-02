import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth-token")?.value;

  const isAuthPath = AuthPath.some((route) => pathname.startsWith(route));
  const isAdminPath = adminPath.some((route) => pathname.startsWith(route));

  if (authToken && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authToken && isAdminPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authToken && pathname.includes("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // console.log(NextResponse.next());

  return NextResponse.next();
}

const adminPath = ["/dashboard", "/dashboard/(.*)"];
const AuthPath = ["/login", "/forget-password"];
