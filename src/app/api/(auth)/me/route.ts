import { NextResponse } from "next/server";
import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";

export async function POST(req: Request) {
  const { userId } = await req.json();
  await connectMongoDb();

  const user = await UserModel.findById(userId)
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
