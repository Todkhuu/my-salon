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
      return NextResponse.json({ message: "Success", staff }, { status: 200 });
    } else {
      const allStaff = await StaffModel.find().populate("services");
      return NextResponse.json(
        { message: "Success", allStaff },
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
    const body = await req.json();
    const { category, ...staffData } = body;
    const services = await ServiceModel.find({ category });
    const serviceIds = services.map((service) => service._id);

    const newStaff = await StaffModel.create({
      ...staffData,
      category,
      services: serviceIds,
    });

    return NextResponse.json(
      { message: "Staff successfully added", newStaff },
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

    const updatedStaff = await StaffModel.findByIdAndUpdate(id, data, {
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

    const deletedStaff = await StaffModel.findByIdAndDelete(id);

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
