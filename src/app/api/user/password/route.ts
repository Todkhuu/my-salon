import { NextResponse } from "next/server";
import { connectMongoDb } from "@/server/database/db";
import bcrypt from "bcryptjs";
import { getUserFromCookie } from "@/lib/auth";
import { UserModel } from "@/server/models";

await connectMongoDb();

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгчийг олж чадсангүй." },
        { status: 401 }
      );
    }

    const userId = user?._id;

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй." },
        { status: 404 }
      );
    }
    console.log("Болсон хэрэглэгчийн нууц үг:", existingUser);

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
    console.log("Нууц үг зөв эсэх:", isPasswordCorrect);

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
