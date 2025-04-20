import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, SECRET) as {
      id: string;
      role?: "ADMIN" | "STAFF"; // USER role байхгүй
    };

    const pathname = request.nextUrl.pathname;

    // ✅ Admin зөвхөн /admin руу
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Staff зөвхөн /staff руу
    if (
      pathname.startsWith("/staff") &&
      decoded.role !== "STAFF" &&
      decoded.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Logged in USER зөвхөн /dashboard руу (staff, admin орж болохгүй)
    if (
      pathname.startsWith("/dashboard") &&
      decoded.role // role нь байгаа бол Staff/Admin байна
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ Зөв бол үргэлжлүүлнэ
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/dashboard/:path*"], // хамгаалах route-ууд
};
