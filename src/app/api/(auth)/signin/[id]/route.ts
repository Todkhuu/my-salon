import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const userId = context.params.id.replace(/"/g, "");
    console.log("User ID:", userId);

    const user = await UserModel.findById(userId);
    console.log("userrr", user);

    return NextResponse.json({ message: `User ID received:`, user });
  } catch (error) {
    return NextResponse.json(
      { message: "Алдаа гарлаа", error },
      { status: 500 }
    );
  }
}
