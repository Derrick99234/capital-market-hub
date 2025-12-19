// app/api/admin/user/update-balance/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  await connectDB();
  const admin = await User.findById(decoded.id);
  if (!admin || admin.role !== "admin") throw new Error("Forbidden");
  return admin;
}

export async function POST(req: NextRequest) {
  try {
    // await requireAdmin(req);
    const { userId, balance } = await req.json();
    if (!userId || !balance)
      return NextResponse.json(
        { error: "userId and numeric balance required" },
        { status: 400 }
      );

    await connectDB();
    const user = await User.findById(userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.balance = balance;
    await user.save();

    return NextResponse.json({
      message: "Balance updated",
      user: { id: user._id, balance: user.balance },
    });
  } catch (err: any) {
    const status =
      err.message === "Unauthorized"
        ? 401
        : err.message === "Forbidden"
        ? 403
        : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}
