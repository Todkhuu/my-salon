import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/auth";
import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";

export async function GET() {
  await connectMongoDb();

  const decoded = await getUserFromCookie();

  if (!decoded) {
    return NextResponse.json(
      { message: "Та нэвтрээгүй байна." }
      // { status: 401 }
    );
  }

  const user = await UserModel.findById(decoded.id)
    .lean()
    .populate({
      path: "favoriteStaff",
      populate: {
        path: "services",
        model: "Services",
      },
    })
    .populate("favoriteServices");

  if (!user) {
    return NextResponse.json(
      { message: "Хэрэглэгч олдсонгүй." }
      // { status: 404 }
    );
  }

  return NextResponse.json(user);
}
