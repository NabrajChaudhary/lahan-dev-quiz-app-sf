import { type NextRequest, NextResponse } from "next/server";
import { executeFetch } from "./lib/execute-fetch";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth-token")?.value;

  const isAuthPath = AuthPath.some((route) => pathname.startsWith(route));
  const isAdminPath = adminPath.some((route) => pathname.startsWith(route));

  // If no auth token and trying to access protected routes
  if (
    !authToken &&
    (isAdminPath ||
      pathname.includes("/profile") ||
      pathname.includes("/feedback"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If auth token exists and trying to access auth pages, redirect to dashboard
  if (authToken && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If trying to access admin paths, verify admin status
  if (isAdminPath && authToken) {
    try {
      const getProfileDataResponse = await executeFetch("/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!getProfileDataResponse.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      const profileData = await getProfileDataResponse.json();
      const isAdmin = profileData.data.userType === "admin";

      // If not admin, redirect to home page
      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // For profile page access with auth token
  if (pathname.includes("/profile") && authToken) {
    try {
      const getProfileDataResponse = await executeFetch("/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!getProfileDataResponse.ok) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

const adminPath = ["/dashboard"];
const AuthPath = ["/login", "/admin", "/forget-password"];

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/login",
    "/forget-password",
    "/feedback",
    "/admin",
  ],
};
