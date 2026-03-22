// POST /api/kyc/approve - Approve a KYC application (admin only)
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

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);

    const { kycId } = await req.json();
    if (!kycId) {
      return NextResponse.json({ error: "kycId is required" }, { status: 400 });
    }

    await connectDB();
    const kyc = await KYC.findById(kycId);
    if (!kyc) {
      return NextResponse.json(
        { error: "KYC application not found" },
        { status: 404 },
      );
    }

    if (kyc.status === "approved") {
      return NextResponse.json(
        { error: "KYC application is already approved" },
        { status: 400 },
      );
    }

    kyc.status = "approved";
    kyc.rejectionReason = undefined;
    kyc.reviewedAt = new Date();
    await kyc.save();

    return NextResponse.json({
      message: "KYC application approved successfully",
      kyc,
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
