import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { connectMongoDb } from "@/server/database/db";

export async function GET() {
  connectMongoDb();
  const user = await getUserFromCookie();

  if (!user) {
    return NextResponse.json(
      { message: "Та нэвтрээгүй байна." },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}
