import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Withdrawal from "@/models/withdrawal";
import sendNotificationEmail from "@/lib/send-notification";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  await connectDB();

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);

    const withdrawals =
      user.role === "admin"
        ? await Withdrawal.find()
            .populate("userId", "firstName lastName email")
            .sort({ createdAt: -1 })
            .lean()
        : await Withdrawal.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .lean();

    return NextResponse.json({ withdrawals });
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

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const { amount, method, address } = await req.json();

    if (!amount || amount <= 0 || !method || !address?.trim()) {
      throw new Error("Missing required fields");
    }

    const newWithdrawal = new Withdrawal({
      userId: user._id,
      amount,
      method,
      address: address.trim(),
    });

    await newWithdrawal.save();

    try {
      await sendNotificationEmail(
        "withdrawal",
        user.email,
        `${user.firstName} ${user.lastName}`,
        {
          amount,
          method,
        },
      );
    } catch (emailError) {
      console.error("Failed to send withdrawal email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Withdrawal request created successfully",
        withdrawal: newWithdrawal,
      },
      { status: 201 },
    );
  } catch (err: any) {
    const status =
      err.message === "Unauthorized"
        ? 401
        : err.message === "Forbidden"
          ? 403
          : 400;

    return NextResponse.json({ error: err.message }, { status });
  }
}
