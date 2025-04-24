import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { NextResponse } from "next/server";

connectMongoDb();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json(
        { message: "Хэрэглэгчийн ID буруу эсвэл олдсонгүй." },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(_id);

    if (!user) {
      return NextResponse.json(
        { message: "Хэрэглэгч олдсонгүй." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Амжилттай", user }, { status: 200 });
  } catch (error) {
    console.error("Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Дотоод серверийн алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
