import { AppointmentModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || userId === "undefined") {
      return NextResponse.json(
        { error: "userId параметр буруу байна" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { message: "Хэрэглэгчийн ID дамжуулаагүй байна." },
        { status: 400 }
      );
    }
    const appointments = await AppointmentModel.find({ userId })
      .populate("userId")
      .populate("serviceId")
      .populate("staffId");

    return NextResponse.json(
      {
        message: "Цаг захиалагын мэдээлэл амжилттай уншигдлаа.",
        data: appointments,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Цагийн мэдээлэл унших үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Цагийн мэдээлэл унших үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
