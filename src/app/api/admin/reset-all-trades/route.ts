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

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    
    const { dailyTradeLimit = 5 } = await req.json();

    // Validate input
    if (dailyTradeLimit < 0) {
      return NextResponse.json(
        { error: "Daily trade limit must be a non-negative number" },
        { status: 400 }
      );
    }

    // Update all users except admins
    const result = await User.updateMany(
      { role: { $ne: "admin" } },
      {
        $set: {
          dailyTradeLeft: dailyTradeLimit,
          lastTradeReset: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: `Successfully reset trade limits for ${result.modifiedCount} users`,
      modifiedCount: result.modifiedCount,
      dailyTradeLimit,
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