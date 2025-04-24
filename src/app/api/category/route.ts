import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await CategoryModel.findById(id);
      return NextResponse.json(
        { message: "Ангилал амжилттай олдлоо.", category },
        { status: 200 }
      );
    } else {
      const allCategory = await CategoryModel.find();
      return NextResponse.json(
        { message: "Бүх ангиллууд амжилттай уншигдлаа.", data: allCategory },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Ангилал унших үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал унших үед алдаа гарлаа.",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, image } = await req.json();

    const newCategory = await CategoryModel.create({
      name,
      image,
    });

    return NextResponse.json(
      { message: "Ангилал амжилттай нэмэгдлээ.", newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ангилал үүсгэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал үүсгэх үед алдаа гарлаа.",
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
        { message: "Зөв ID дамжуулаагүй байна." },
        { status: 400 }
      );
    }

    const data = await req.json();

    const updatedStaff = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json(
      {
        message: "Ангилал амжилттай шинэчлэгдлээ.",
        updatedStaff,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ангилал шинэчлэх үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал шинэчлэх үед алдаа гарлаа.",
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
        { message: "Зөв ID дамжуулаагүй байна." },
        { status: 400 }
      );
    }

    const deletedStaff = await CategoryModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return NextResponse.json(
        { message: "Устгах ангилал олдсонгүй." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ангилал амжилттай устгагдлаа.", deletedStaff },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ангилал устгах үед алдаа гарлаа:", error);

    return NextResponse.json(
      {
        message: "Ангилал устгах үед алдаа гарлаа:",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
