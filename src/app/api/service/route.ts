import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const staff = await req.json();
    const createdStaff = await ServiceModel.create(staff);

    return NextResponse.json(
      { message: "Service successfully added", createdStaff },
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
