import { connectMongoDb } from "@/server/database/db";
import { StaffModel } from "@/server/models";
import { NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: Request) {
  try {
    const { password, email } = await req.json();

    const staff = await StaffModel.findOne({ email }).select("+password");

    if (!staff) {
      return NextResponse.json(
        { message: "Энэ имэйлтэй хэрэглэгч олдсонгүй." },
        { status: 401 }
      );
    }

    const isPasswordCorrect = password == staff.password;

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Нууц үг эсвэл имэйл буруу байна." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Амжилттай нэвтэрлээ.", staff },
      { status: 200 }
    );
  } catch (error) {
    console.error("Нэвтрэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Серверийн дотоод алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
