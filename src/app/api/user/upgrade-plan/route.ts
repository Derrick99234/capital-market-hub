import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const PLAN_CONFIGS: Record<
  string,
  { name: string; minDeposit: number; maxDeposit: number }
> = {
  BRONZE: {
    name: "Bronze Plan",
    minDeposit: 3000,
    maxDeposit: 10000,
  },
  SILVER: {
    name: "Silver Plan",
    minDeposit: 10000,
    maxDeposit: 50000,
  },
  GOLD: {
    name: "Gold Plan",
    minDeposit: 50000,
    maxDeposit: Infinity,
  },
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Authenticate user
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let authUserId: string | null = null;
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        authUserId = decoded.id;
      } catch (err) {
        // Invalid token
      }
    }

    const body = await req.json();
    const { planTier, amount, userId } = body;
    const targetUserId = authUserId || userId;

    if (!targetUserId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to upgrade your plan." },
        { status: 401 }
      );
    }

    if (!planTier) {
      return NextResponse.json(
        { error: "Please select a plan to upgrade to." },
        { status: 400 }
      );
    }

    const normalizedTier = String(planTier).toUpperCase();
    const planConfig = PLAN_CONFIGS[normalizedTier];

    if (!planConfig) {
      return NextResponse.json(
        {
          error:
            "Invalid plan selected. Valid options are BRONZE, SILVER, and GOLD.",
        },
        { status: 400 }
      );
    }

    const parsedAmount =
      amount !== undefined && amount !== null && amount !== ""
        ? Number(amount)
        : planConfig.minDeposit;

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid investment amount." },
        { status: 400 }
      );
    }

    if (parsedAmount < planConfig.minDeposit) {
      return NextResponse.json(
        {
          error: `Minimum investment for the ${planConfig.name} is $${planConfig.minDeposit.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    if (
      planConfig.maxDeposit !== Infinity &&
      parsedAmount > planConfig.maxDeposit
    ) {
      return NextResponse.json(
        {
          error: `Maximum investment for the ${planConfig.name} is $${planConfig.maxDeposit.toLocaleString()}.`,
        },
        { status: 400 }
      );
    }

    const user = await User.findById(targetUserId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    user.plan = {
      name: planConfig.name,
      tier: normalizedTier as "BRONZE" | "SILVER" | "GOLD",
      amount: parsedAmount,
      status: "ACTIVE",
      upgradedAt: new Date(),
    };

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: `Your account has been upgraded to the ${planConfig.name} with an investment limit of $${parsedAmount.toLocaleString()}.`,
        plan: user.plan,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upgrade plan error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upgrade plan." },
      { status: 500 }
    );
  }
}
