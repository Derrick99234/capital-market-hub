import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Trade from "@/models/Trades";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const trades = await Trade.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(trades, { status: 200 });
  } catch (error) {
    console.error("User GET Trades Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user trades" },
      { status: 500 }
    );
  }
}
