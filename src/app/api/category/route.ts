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
        { message: "success", category },
        { status: 200 }
      );
    } else {
      const allCategory = await CategoryModel.find();
      return NextResponse.json(
        { message: "Success", data: allCategory },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error retrieving staff:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
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
      { message: "Category амжилттай нэмлээ", newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during create staff:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
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
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const data = await req.json();

    const updatedStaff = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json(
      {
        message: "Staff successfully updated",
        updatedStaff,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during update staff:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
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
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedStaff = await CategoryModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return NextResponse.json({ message: "Staff not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully", deletedStaff },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
