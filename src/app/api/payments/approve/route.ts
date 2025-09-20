// app/api/admin/payments/approve/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/payment";
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
    await requireAdmin(req);
    const { paymentId } = await req.json();
    if (!paymentId)
      return NextResponse.json(
        { error: "paymentId required" },
        { status: 400 }
      );

    await connectDB();
    const payment = await Payment.findById(paymentId);
    if (!payment)
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    if (payment.status !== "pending")
      return NextResponse.json(
        { error: "Payment not pending" },
        { status: 400 }
      );

    // Approve: update user balance
    const user = await User.findById(payment.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.balance = (user.balance || 0) + payment.amount;
    await user.save();

    payment.status = "approved";
    await payment.save();

    return NextResponse.json({ message: "Payment approved", payment });
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
