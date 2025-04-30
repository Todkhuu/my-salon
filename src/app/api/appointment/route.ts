import { connectMongoDb } from "@/server/database/db";
import { NextRequest, NextResponse } from "next/server";
import { AppointmentModel } from "@/server/models";
import "@/server/models";

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

export async function GET() {
  try {
    const appointments = await AppointmentModel.find()
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
