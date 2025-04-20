import { cookies } from "next/headers";
import { verifyToken } from "@/server/utils/jwt"; // JWT verify function
import { UserModel } from "@/server/models";
import { NextResponse } from "next/server";

// Сервер дээр хэрэглэгчийн мэдээллийг авна
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded: any = verifyToken(token); // JWT token-ийг verify хийж байна
    const user = await UserModel.findById(decoded.id).select("-password");

    return NextResponse.json({ user }); // Хэрэглэгчийн мэдээллийг буцаана
  } catch (err) {
    return NextResponse.json({ user: null }); // Алдаа гарсан тохиолдолд null буцаана
  }
}
