import { connectMongoDb } from "@/server/database/db";
import { UserModel } from "@/server/models";
import { hashPassword, isExistingUser } from "@/server/utils";
import { NextRequest, NextResponse } from "next/server";

connectMongoDb();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const existingUser = await isExistingUser(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "User is already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);

    const newStaff = await UserModel.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User successfully registered.", data: newStaff },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
