import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/server/models";
import { getUserFromCookie } from "@/lib/auth"; // httpOnly cookie-г decode хийдэг функц
import { connectMongoDb } from "@/server/database/db";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { staffId } = await req.json();
    const userId = await getUserFromCookie();
    console.log("first", userId);

    const user = await UserModel.findById(userId);

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (user.favoriteStaff?.includes(staffId)) {
      user.favoriteStaff = user.favoriteStaff.filter((id) => id !== staffId);
    } else {
      user.favoriteStaff?.push(staffId);
    }

    await user.save();
    return NextResponse.json({
      message: "Updated favorites",
      favoriteStaff: user.favoriteStaff,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
