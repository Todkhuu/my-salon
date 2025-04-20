import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token", token);

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string };
    return decoded;
  } catch {
    return null;
  }
}
