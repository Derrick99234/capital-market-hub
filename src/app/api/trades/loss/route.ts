import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Trades from "@/models/Trades";
import sendNotificationEmail from "@/lib/send-notification";

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
    const { tradeId, lossAmount, reason } = await req.json();
    if (!tradeId)
      return NextResponse.json({ error: "tradeId required" }, { status: 400 });
    if (!lossAmount || lossAmount <= 0)
      return NextResponse.json({ error: "Valid loss amount required" }, { status: 400 });

    await connectDB();
    const trade = await Trades.findById(tradeId);
    if (!trade)
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });

    // Update trade with loss and status
    trade.status = "LOSS";
    trade.profitLoss = -lossAmount; // Store negative loss amount
    trade.note = reason || "Trade resulted in loss";
    await trade.save();

    // Note: Loss amount is recorded but NOT deducted from user balance
    // This is safer and more common in trading platforms

    // Send trade loss notification email
    try {
      const user = await User.findById(trade.userId);
      if (user) {
        await sendNotificationEmail("tradeLost", user.email, `${user.firstName} ${user.lastName}`, {
          tradeType: trade.type,
          asset: trade.assetTicker,
          amount: trade.tradeAmount,
          lossAmount: lossAmount,
        });
      }
    } catch (emailError) {
      console.error("Failed to send trade loss email:", emailError);
      // Continue even if email fails
    }

    return NextResponse.json({
      message: "Trade recorded as loss",
      trade
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
