import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await requireAdmin(req);
    
    const { userId } = await params;
    const body = await req.json();
    const dailyTradeLeft =
      body?.dailyTradeLeft ?? body?.dailyTradeLimit ?? body?.dailyTradesLeft;

    // Validate input
    if (dailyTradeLeft === undefined || Number(dailyTradeLeft) < 0) {
      return NextResponse.json(
        { error: "Daily trade limit must be a non-negative number" },
        { status: 400 }
      );
    }

    const nextDailyTradeLeft = Number(dailyTradeLeft);
    if (!Number.isFinite(nextDailyTradeLeft)) {
      return NextResponse.json(
        { error: "Daily trade limit must be a valid number" },
        { status: 400 }
      );
    }

    // Find and update user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Reset trade limits
    user.dailyTradeLeft = nextDailyTradeLeft;
    user.lastTradeReset = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: `User daily trades left updated to ${nextDailyTradeLeft}`,
      user: {
        id: user._id,
        email: user.email,
        dailyTradeLeft: user.dailyTradeLeft,
        lastTradeReset: user.lastTradeReset,
      },
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
