// app/api/admin/payments/reject/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Trades from "@/models/Trades";

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
    const { tradeId, reason } = await req.json();
    if (!tradeId)
      return NextResponse.json({ error: "tradeId required" }, { status: 400 });

    await connectDB();
    const trade = await Trades.findById(tradeId);
    if (!trade)
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });

    trade.status = "PENDING";
    trade.note = reason || "held by admin";
    await trade.save();
    return NextResponse.json({ message: "Trade held", trade });
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
