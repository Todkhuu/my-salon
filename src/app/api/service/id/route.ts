import { connectMongoDb } from "@/server/database/db";
import { ServiceModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

await connectMongoDb();

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const updatedService = await ServiceModel.findByIdAndUpdate(body.id, body, {
      new: true, // update хийсний дараах шинэ document-г буцаана
      runValidators: true, // validation шалгалтуудыг мөн ажиллуулна
    });

    if (!updatedService) {
      return NextResponse.json(
        { message: "Үйлчилгээ олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ямар нэгэн алдаа гарлаа" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const service = await ServiceModel.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { message: "Үйлчилгээ олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Үйлчилгээ амжилттай устгагдлаа" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SERVICE_DELETE]", error);
    return NextResponse.json(
      { message: "Үйлчилгээ устгах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
