import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectMongoDb();
    const body = await req.json();

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      body.id,
      body,
      {
        new: true, // update хийсний дараах шинэ document-г буцаана
        runValidators: true, // validation шалгалтуудыг мөн ажиллуулна
      }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Ангилал олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ямар нэгэн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
