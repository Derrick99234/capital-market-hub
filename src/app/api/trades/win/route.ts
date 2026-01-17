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
    const { tradeId, profitAmount } = await req.json();
    if (!tradeId)
      return NextResponse.json({ error: "TradeID required" }, { status: 400 });
    if (!profitAmount || profitAmount <= 0)
      return NextResponse.json({ error: "Valid profit amount required" }, { status: 400 });

    await connectDB();
    const trade = await Trades.findById(tradeId);
    if (!trade)
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    if (trade.status !== "PENDING")
      return NextResponse.json({ error: "Trade not pending" }, { status: 400 });

    // Update trade with profit and status
    const user = await User.findById(trade.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    trade.status = "WIN";
    trade.profitLoss = profitAmount; // Store positive profit amount
    await trade.save();

    // Add profit to user balance
    user.balance.totalBalance += profitAmount;
    await user.save();

    return NextResponse.json({
      message: "Trade approved with profit",
      trade,
      user: { id: user._id, balance: user.balance }
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
