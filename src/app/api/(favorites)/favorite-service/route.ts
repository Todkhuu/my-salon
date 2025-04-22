import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/server/models";
import { getUserFromCookie } from "@/lib/auth"; // httpOnly cookie-г decode хийдэг функц
import { connectMongoDb } from "@/server/database/db";
import { Types } from "mongoose";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { serviceId } = await req.json();
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

    const serviceObjectId = new Types.ObjectId(serviceId);

    const isFavorite = existingUser.favoriteServices?.some(
      (id) => id.toString() === serviceObjectId.toString()
    );

    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = existingUser.favoriteServices?.filter(
        (id) => id.toString() !== serviceObjectId.toString()
      );
    } else {
      updatedFavorites = [...(existingUser.favoriteServices || []), serviceId];
    }

    existingUser.favoriteServices = updatedFavorites;
    await existingUser.save();

    return NextResponse.json({
      message: "Шинэчлэгдлээ",
      favoriteStaff: existingUser.favoriteServices,
    });
  } catch (error) {
    console.error("Дуртай үйлчилгээ шинэчлэх үед алдаа гарлаа:", error);
    return NextResponse.json({ message: "Серверийн алдаа" }, { status: 500 });
  }
}
