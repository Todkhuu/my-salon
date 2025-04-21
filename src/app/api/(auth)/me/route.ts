import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";

export async function GET() {
  const user = await getUserFromCookie();

  if (!user) {
    return NextResponse.json(
      { message: "Та нэвтрээгүй байна." },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}
