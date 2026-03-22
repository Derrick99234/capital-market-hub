// GET /api/kyc/pending - Get all pending KYC applications (admin only)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import KYC from "@/models/KYC";
import User from "@/models/User";

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

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const pendingKYC = await KYC.find({ status: "pending" })
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ kycApplications: pendingKYC });
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
