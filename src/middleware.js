import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth_token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Proteksi halaman /dashboard dan turunannya
};
