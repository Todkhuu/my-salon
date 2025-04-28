import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

await connectMongoDb();

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const updatedService = await ServiceModel.findByIdAndUpdate(id, body, {
      new: true, // update хийсний дараах шинэ document-г буцаана
      runValidators: true, // validation шалгалтуудыг мөн ажиллуулна
    });

    if (!updatedService) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const service = await ServiceModel.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SERVICE_DELETE]", error);
    return NextResponse.json(
      { message: "Failed to delete service" },
      { status: 500 }
    );
  }
}
