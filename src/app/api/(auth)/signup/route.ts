import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { hashPassword, isExistingUser } from "@/server/utils";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return NextResponse.json(
        {
          message: "Xэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Имэйл хаяг шаардлагатай." },
        { status: 400 }
      );
    }

    const existingUser = await isExistingUser(email);

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);

    const newStaff = await UserModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Хэрэглэгч амжилттай бүртгэгдлээ.", data: newStaff },
      { status: 201 }
    );
  } catch (error) {
    console.error("Бүртгүүлэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Серверийн дотоод алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
