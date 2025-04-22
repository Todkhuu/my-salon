import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const staff = await req.json();
    const createdStaff = await ServiceModel.create(staff);

    return NextResponse.json(
      { message: "Үйлчилгээ амжилттай нэмэгдлээ", createdStaff },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during add service:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const serviceData = await ServiceModel.find().populate("category");

    return NextResponse.json(
      {
        message: "Амжилттай service мэдээлэл татлаа",
        data: serviceData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Алдаа гарлаа service татах үед:", err);

    return NextResponse.json(
      {
        message: "Дотоод серверийн алдаа",
        error: err instanceof Error ? err.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
