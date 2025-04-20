import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserModel } from "@/server/models";
import { UserType } from "@/server/utils";

const SECRET = process.env.JWT_SECRET!;

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string };

    const user = await UserModel.findById(decoded.id)
      .select("-password")
      .lean();

    if (!user) {
      throw new Error("User not found");
    }

    return user as UserType;
  } catch (error) {
    console.error("Error verifying token or fetching user:", error);
    return null;
  }
}
