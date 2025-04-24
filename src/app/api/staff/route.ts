import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { StaffModel } from "@/server/models/staff.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const staff = await StaffModel.findById(id).populate("services");
      return NextResponse.json(
        { message: "Ажилтны мэдээлэл амжилттай олдлоо.", staff },
        { status: 200 }
      );
    } else {
      const allStaff = await StaffModel.find().populate("services");
      return NextResponse.json(
        {
          message: "Бүх ажилтнуудын мэдээлэл амжилттай олдлоо.",
          data: allStaff,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Ажилтны мэдээлэл авах үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ажилтны мэдээлэл авах үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, ...staffData } = body;

    const staffs = await ServiceModel.find({ category });
    if (!staffs.length) {
      return NextResponse.json(
        { message: "Ажилтaн олдсонгүй." },
        { status: 404 }
      );
    }

    const serviceIds = staffs.map((staff) => staff._id);
    const newStaff = await StaffModel.create({
      ...staffData,
      category,
      services: serviceIds,
    });

    return NextResponse.json(
      { message: "Шинэ ажилтны мэдээлэл амжилттай үүслээ.", newStaff },
      { status: 201 }
    );
  } catch (error) {
    console.error("Шинэ ажилтан үүсгэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Шинэ ажилтан үүсгэх үед алдаа гарлаа:",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Мөрдөгдсөн ажилтны ID алдаатай." },
        { status: 400 }
      );
    }

    const data = await req.json();

    const updatedStaff = await StaffModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json(
      {
        message: "Ажилтны мэдээлэл амжилттай засварлагдлаа.",
        updatedStaff,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ажилтны мэдээлэл засварлах үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ажилтны мэдээлэл засварлах үед алдаа гарлаа:",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Мөрдөгдсөн ажилтны ID алдаатай." },
        { status: 400 }
      );
    }

    const deletedStaff = await StaffModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return NextResponse.json(
        { message: "Ажилтны мэдээлэл олдсонгүй." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ажилтны мэдээлэл амжилттай устгагдлаа.", deletedStaff },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ажилтны мэдээлэл устгах үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ажилтны мэдээлэл устгах үед алдаа гарлаа:",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
