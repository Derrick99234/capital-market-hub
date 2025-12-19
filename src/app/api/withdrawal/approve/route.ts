// app/api/admin/payments/approve/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Withdrawal from "@/models/withdrawal";

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
    const { withdrawalID } = await req.json();
    if (!withdrawalID)
      return NextResponse.json(
        { error: "WithdrawalID required" },
        { status: 400 }
      );

    await connectDB();
    const withdrawal = await Withdrawal.findById(withdrawalID);
    if (!withdrawal)
      return NextResponse.json(
        { error: "Withdrawal not found" },
        { status: 404 }
      );
    if (withdrawal.status !== "pending")
      return NextResponse.json(
        { error: "Withdrawal not pending" },
        { status: 400 }
      );

    // Approve: update user balance
    const user = await User.findById(withdrawal.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.balance.totalBalance =
      (user.balance.totalBalance || 0) - withdrawal.amount;
    await user.save();

    withdrawal.status = "approved";
    await withdrawal.save();
    return NextResponse.json({ message: "Withdrawal approved", withdrawal });
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
