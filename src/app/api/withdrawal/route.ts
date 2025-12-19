// app/api/admin/payments/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Withdrawal from "@/models/withdrawal";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Helper function to require admin role
async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  await connectDB();
  const admin = await User.findById(decoded.id);
  if (!admin || admin.role !== "admin") throw new Error("Forbidden");
  return admin;
}

// GET all pending payments
export async function GET(req: NextRequest) {
  try {
    // await requireAdmin(req);
    const withdrawals = await Withdrawal.find()
      .populate("userId", "firstName lastName email")
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

// GET a specific payment by ID
export async function GET_single(req: NextRequest) {
  try {
    // await requireAdmin(req);
    const urlParts = req.nextUrl.pathname.split("/");
    const withdrawalId = urlParts[urlParts.length - 1];
    const withdrawal = await Withdrawal.findById(withdrawalId)
      .populate("userId", "firstName lastName email")
      .lean();

    if (!withdrawal) {
      return NextResponse.json(
        { error: "Withdrawal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ withdrawal });
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

// POST to add a new payment
export async function POST(req: NextRequest) {
  try {
    const { userId, amount, method } = await req.json();

    console.log(
      `
      userId: ${userId}
      amount: ${amount}
      method: ${method}
      `
    );
    // Validation (you can customize this based on your needs)
    if (!userId || !amount) {
      throw new Error("Missing required fields");
    }

    // Create the new payment
    const newPayment = new Withdrawal({
      userId,
      amount,
      method,
    });

    await newPayment.save();

    return NextResponse.json({
      message: "Payment added successfully",
      payment: newPayment,
    });
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
