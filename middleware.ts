import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;
  console.log("token", token);
  console.log("path", pathname);

  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/staff") ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = verify(token, SECRET) as {
      id: string;
      role?: "ADMIN" | "STAFF";
    };

    // 🔐 Admin зөвхөн /admin
    if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 🧑‍🔧 Staff зөвхөн /staff
    if (
      pathname.startsWith("/staff") &&
      decoded.role !== "STAFF" &&
      decoded.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      pathname.startsWith("/dashboard") &&
      (decoded.role === "STAFF" || decoded.role === "ADMIN")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ✅ token байгаа, зөв role → үргэлжлүүлнэ
    return NextResponse.next();
  } catch (err) {
    // ❌ JWT decode алдаа
    console.error(err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*", "/dashboard/:path*"],
};
