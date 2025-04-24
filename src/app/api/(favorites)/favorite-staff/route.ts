import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/server/models";
import { getUserFromCookie } from "@/lib/auth"; // httpOnly cookie-г decode хийдэг функц
import { connectMongoDb } from "@/server/database/db";
import { Types } from "mongoose";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { staffId } = await req.json();
    const userId = await getUserFromCookie();

    if (!userId) {
      return NextResponse.json({ message: "Зөвшөөрөлгүй" }, { status: 401 });
    }

    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    const staffObjectId = new Types.ObjectId(staffId);

    const isFavorite = existingUser.favoriteStaff?.some(
      (id) => id.toString() === staffObjectId.toString()
    );

    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = existingUser.favoriteStaff?.filter(
        (id) => id && id.toString() !== staffObjectId.toString()
      );
    } else {
      updatedFavorites = [...(existingUser.favoriteStaff || []), staffId];
    }

    existingUser.favoriteStaff = updatedFavorites;
    await existingUser.save();

    return NextResponse.json({
      message: "Шинэчлэгдлээ",
      favoriteStaff: existingUser.favoriteStaff,
    });
  } catch (error) {
    console.error("Дуртай ажилчин шинэчлэх үед алдаа гарлаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
