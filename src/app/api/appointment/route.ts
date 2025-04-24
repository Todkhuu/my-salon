import { connectMongoDb } from "@/server/database/db";
import { AppointmentModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const appointment = await req.json();
    const createdStaff = await AppointmentModel.create(appointment);

    return NextResponse.json(
      {
        message: "Цаг амжилттай захиалагдлаа.",
        success: true,
        createdStaff,
      },

      { status: 201 }
    );
  } catch (error) {
    console.error("Цаг захиалах үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Цаг захиалах үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Хэрэглэгчийн ID дамжуулаагүй байна." },
        { status: 400 }
      );
    }
    const appointments = await AppointmentModel.find({ userId })
      .populate("userId")
      .populate("serviceIds");

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
