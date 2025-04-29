import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { connectMongoDb } from "@/server/database/db";
import { StaffModel } from "@/server/models";

export async function GET() {
  await connectMongoDb();

  const decoded = await getUserFromCookie();

  if (!decoded) {
    return NextResponse.json(
      { message: "Та нэвтрээгүй байна." },
      { status: 401 }
    );
  }

  const staffAndAdmin = await StaffModel.findById(decoded.id);

  console.log("staffAndAdmin", staffAndAdmin);

  if (!staffAndAdmin) {
    return NextResponse.json({ message: "олдсонгүй." }, { status: 404 });
  }

  return NextResponse.json(staffAndAdmin);
}
