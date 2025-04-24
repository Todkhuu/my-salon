import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { comparePassword } from "@/server/utils";
import { NextResponse } from "next/server";
import { signToken } from "@/server/utils/jwt";
import { cookies } from "next/headers";

connectMongoDb();

export async function POST(req: Request) {
  try {
    const { password, email } = await req.json();

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Энэ имэйлтэй хэрэглэгч олдсонгүй." },
        { status: 401 }
      );
    }

    const isPasswordCorrect = comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Нууц үг эсвэл имэйл буруу байна." },
        { status: 401 }
      );
    }

    const token = signToken({ id: user._id });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 хоног
    });

    return NextResponse.json(
      { message: "Амжилттай нэвтэрлээ.", user },
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
