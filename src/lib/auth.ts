import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string };
    return decoded; // Зөвхөн decoded-г буцаана!
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
