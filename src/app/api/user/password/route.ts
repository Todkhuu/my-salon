import { NextResponse } from "next/server";
import { connectMongoDb } from "@/server/database/db";
import bcrypt from "bcryptjs";
import { UserModel } from "@/server/models";

await connectMongoDb();

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, currentPassword, newPassword } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Хэрэглэгчийг олж чадсангүй." },
        { status: 401 }
      );
    }

    const existingUser = await UserModel.findById(userId).select("+password");
    if (!existingUser) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй." },
        { status: 404 }
      );
    }

    if (!currentPassword || !existingUser?.password) {
      return NextResponse.json(
        {
          message:
            "Одоогийн нууц үг эсвэл хэрэглэгчийн мэдээлэл алдаатай байна.",
        },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      existingUser?.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Одоогийн нууц үг буруу байна." },
        { status: 400 }
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedNewPassword;
    await existingUser.save();

    return NextResponse.json(
      { message: "Нууц үг амжилттай шинэчлэгдлээ." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Нууц үг шинэчлэхэд алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Нууц үг шинэчлэхэд алдаа гарлаа." },
      { status: 500 }
    );
  }
}
