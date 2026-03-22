// GET /api/kyc/user - Get current user's KYC status
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import KYC from "@/models/KYC";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    await connectDB();

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const kyc = await KYC.findOne({ userId: user._id }).lean();

    if (!kyc) {
      return NextResponse.json({
        kyc: null,
        message: "No KYC application found. Please submit your KYC.",
      });
    }

    return NextResponse.json({ kyc });
  } catch (err: any) {
    console.error("Fetch KYC error:", err);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
