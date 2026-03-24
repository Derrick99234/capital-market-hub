// POST /api/kyc - Submit KYC application (authenticated user)
// GET /api/kyc - Get all KYC applications (admin)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import KYC from "@/models/KYC";
import User from "@/models/User";
import { uploadFileToR2 } from "@/lib/r2";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  await connectDB();
  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new Error("Unauthorized");
  return user;
}

async function requireAdmin(req: NextRequest) {
  const user = await getAuthUser(req);
  if (user.role !== "admin") throw new Error("Forbidden");
  return user;
}

// POST - Submit KYC application
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);

    // Check if user already has a KYC application
    const existingKYC = await KYC.findOne({ userId: user._id });
    if (existingKYC) {
      if (existingKYC.status === "approved") {
        return NextResponse.json(
          { error: "Your KYC has already been approved" },
          { status: 400 },
        );
      }
      if (existingKYC.status === "pending") {
        return NextResponse.json(
          { error: "You already have a pending KYC application" },
          { status: 400 },
        );
      }
      // If rejected, allow resubmission by deleting old record
      await KYC.findByIdAndDelete(existingKYC._id);
    }

    const formData = await req.formData();

    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const country = formData.get("country") as string;
    const address = formData.get("address") as string;
    const idDocument = formData.get("idDocument") as File | null;
    const selfie = formData.get("selfie") as File | null;

    // Validate required fields
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !country ||
      !address
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required: email, firstName, lastName, phoneNumber, country, address",
        },
        { status: 400 },
      );
    }

    if (!idDocument || !selfie) {
      return NextResponse.json(
        { error: "Both ID document and selfie photo are required" },
        { status: 400 },
      );
    }

    // Validate file types
    const allowedIdDocumentTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    const allowedSelfieTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedIdDocumentTypes.includes(idDocument.type)) {
      return NextResponse.json(
        { error: "ID document must be a JPEG, PNG, WebP, or PDF file" },
        { status: 400 },
      );
    }
    if (!allowedSelfieTypes.includes(selfie.type)) {
      return NextResponse.json(
        { error: "Selfie must be a JPEG, PNG, or WebP image" },
        { status: 400 },
      );
    }

    // Validate file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024;
    if (idDocument.size > maxSize) {
      return NextResponse.json(
        { error: "ID document file size must be less than 5MB" },
        { status: 400 },
      );
    }
    if (selfie.size > maxSize) {
      return NextResponse.json(
        { error: "Selfie file size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Save files
    const idDocumentUrl = await uploadFileToR2(idDocument, "kyc/id-documents");
    const selfieUrl = await uploadFileToR2(selfie, "kyc/selfies");

    // Create KYC record
    const kyc = new KYC({
      userId: user._id,
      email,
      firstName,
      lastName,
      phoneNumber,
      country,
      address,
      idDocumentUrl,
      selfieUrl,
    });

    await kyc.save();

    return NextResponse.json(
      { message: "KYC application submitted successfully", kyc },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("KYC submission error:", err);
    const status =
      err.message === "Unauthorized"
        ? 401
        : err.message === "Forbidden"
          ? 403
          : 500;
    return NextResponse.json({ error: err.message }, { status });
  }
}

// GET - Get all KYC applications (admin only)
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const kycApplications = await KYC.find()
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ kycApplications });
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
