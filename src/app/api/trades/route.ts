import { NextRequest, NextResponse } from "next/server";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import Trade from "@/models/Trades";
import sendNotificationEmail from "@/lib/send-notification";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { type, assetClass, assetTicker, tradeAmount, duration, userId } =
      body;

    if (!type || !assetClass || !assetTicker || !tradeAmount || !duration) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.balance.totalBalance < tradeAmount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 }
      );
    }
    user.dailyTradeLeft -= 1;

    // Deduct balance
    user.balance.totalBalance -= tradeAmount;
    await user.save();

    const trade = await Trade.create({
      userId,
      type,
      assetClass,
      assetTicker,
      tradeAmount,
      duration,
      profitLoss: 0,
      status: "PENDING",
    });

    // Send trade placement notification email
    try {
      await sendNotificationEmail("tradePlaced", user.email, `${user.firstName} ${user.lastName}`, {
        tradeType: type,
        asset: assetTicker,
        amount: tradeAmount,
        duration: duration,
        entryPrice: tradeAmount, // You might want to get actual entry price here
      });
    } catch (emailError) {
      console.error("Failed to send trade placement email:", emailError);
      // Continue with trade creation even if email fails
    }

    return NextResponse.json(
      { message: "Trade created successfully", trade },
      { status: 201 }
    );
  } catch (error) {
    console.error("Trade Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json(
//         { message: "User ID is required" },
//         { status: 400 }
//       );
//     }

//     const trades = await Trade.find({ userId }).sort({ createdAt: -1 });

//     return NextResponse.json(trades, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch user trades" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    await connectDB();
    const trades = await Trade.find()
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email");

    return NextResponse.json(trades, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}
