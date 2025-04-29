import { connectMongoDb } from "@/server/database/db";
import { CategoryModel } from "@/server/models";
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

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, body, {
      new: true, // update хийсний дараах шинэ document-г буцаана
      runValidators: true, // validation шалгалтуудыг мөн ажиллуулна
    });

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

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { message: "Ангилал олдсонгүй" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ангилал амжилттай устгагдлаа" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CATEGORY_DELETE]", error);
    return NextResponse.json(
      { message: "Ангилал устгах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
