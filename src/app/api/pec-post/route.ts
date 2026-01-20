import { connectDB } from "@/lib/mongodb";
import { PECApplication } from "@/models/PECApplication";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN = "https://macwealth.org";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

/**
 * Handle POST request
 */
export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");

    // 🔒 Block unauthorized origins
    if (origin !== ALLOWED_ORIGIN) {
      return new NextResponse("Not allowed", { status: 403 });
    }

    await connectDB();

    // Parse FormData
    const formData = await req.formData();
    const data: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      // Convert arrays to comma-separated strings if needed
      if (Array.isArray(value)) {
        data[key] = value.join(", ");
      } else {
        data[key] = String(value);
      }
    }

    // Convert booleans
    if (
      data.agreeToDeclaration === "true" ||
      data.agreeToDeclaration === true
    ) {
      data.agreeToDeclaration = true;
    } else {
      data.agreeToDeclaration = false;
    }

    // Validate required fields
    if (!data.fullName || !data.phoneNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN },
        },
      );
    }

    // Save to MongoDB
    const newApplication = await PECApplication.create({
      ...data,
      submittedAt: new Date(),
    });

    console.log("PEC Application saved:", newApplication._id);

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN },
      },
    );
  } catch (error) {
    console.error("PEC POST ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN },
      },
    );
  }
}
