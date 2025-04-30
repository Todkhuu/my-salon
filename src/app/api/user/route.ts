import { NextResponse } from "next/server";
import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";

await connectMongoDb();

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { username, email, phoneNumber } = body;
    const user = localStorage.getItem("id");
    const userId = user;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, phoneNumber },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error("Хэрэглэгч олдсонгүй.");
    }

    return NextResponse.json(
      { message: "Амжилттай шинчлэгдлээ" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Дотоод серверийн алдаа",
      },
      { status: 400 }
    );
  }
}
