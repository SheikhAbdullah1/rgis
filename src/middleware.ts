// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const adminAuth = req.cookies.get("admin-auth")?.value;
//   const role = req.cookies.get("role")?.value;
//   const path = req.nextUrl.pathname;

//   // Admin routes — admin-auth cookie check karo
//   if (path.startsWith("/admin")) {
//     if (adminAuth !== "true" || role !== "Admin") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   if (path.startsWith("/dashboard")) {
//     if (!role && adminAuth !== "true") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/dashboard/:path*",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId");

  const role = req.cookies.get("role");

  const path = req.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (path.startsWith("/admin") && role?.value !== "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
