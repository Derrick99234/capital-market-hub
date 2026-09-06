// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Payment from "@/models/payment";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Find user
    const user: any = await User.findById(decoded.id).select("-password").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.plan || user.plan.tier === "TRIAL") {
      const latestApprovedPayment: any = await Payment.findOne({
        userId: user._id,
        status: "approved",
        amount: { $gte: 3000 },
      })
        .sort({ createdAt: -1 })
        .lean();

      if (latestApprovedPayment) {
        let tier = latestApprovedPayment.planTier;
        let name = latestApprovedPayment.planName;
        if (!tier) {
          if (latestApprovedPayment.amount >= 50000) {
            tier = "GOLD";
            name = "Gold Plan";
          } else if (latestApprovedPayment.amount >= 10000) {
            tier = "SILVER";
            name = "Silver Plan";
          } else {
            tier = "BRONZE";
            name = "Bronze Plan";
          }
        }
        user.plan = {
          name: name || (tier === "GOLD" ? "Gold Plan" : tier === "SILVER" ? "Silver Plan" : "Bronze Plan"),
          tier: tier,
          amount: latestApprovedPayment.amount,
          status: "ACTIVE",
          upgradedAt: latestApprovedPayment.updatedAt || new Date(),
        };
        await User.updateOne(
          { _id: user._id },
          { $set: { plan: user.plan } }
        );
      } else if (!user.plan || !user.plan.name) {
        user.plan = {
          name: "Trial Plan",
          tier: "TRIAL",
          amount: 250,
          status: "ACTIVE",
        };
      }
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
