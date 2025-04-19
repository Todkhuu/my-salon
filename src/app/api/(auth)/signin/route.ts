import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { comparePassword } from "@/server/utils";
import { NextResponse } from "next/server";

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

    return NextResponse.json(
      { message: "Амжилттай нэвтэрлээ.", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
