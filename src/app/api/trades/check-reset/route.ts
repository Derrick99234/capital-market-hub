import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { hasTimePassed } from "@/lib/date";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
export async function GET(req: Request) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify token
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

  const user = await User.findById(decoded.id);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const RESET_DURATION = 24 * 60 * 60 * 1000;
  // user.lastTradeReset = new Date();
  // await user.save();

  if (hasTimePassed(user.lastTradeReset, RESET_DURATION)) {
    user.dailyTradeLeft = 5;
    user.lastTradeReset = new Date();
    await user.save();
  }

  console.log(
    "ms passed:",
    Date.now() - new Date(user.lastTradeReset).getTime()
  );

  return NextResponse.json(user);
}
