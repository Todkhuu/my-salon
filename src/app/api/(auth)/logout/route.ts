import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // 0 хийхэд cookie устах болно
  });

  return NextResponse.json({ message: "Гаралт амжилттай" });
}
