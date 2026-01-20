import { connectDB } from "@/lib/mongodb";
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

    // Connect DB (safe even if unused for now)
    await connectDB();

    // Parse FormData
    const formData = await req.formData();
    const data: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      data[key] = String(value);
    }

    // Basic validation
    if (!data.fullName || !data.phoneNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
          },
        },
      );
    }

    console.log(`PEC DATA: ${JSON.stringify(data, null, 2)}`);
    // Forward to Google Apps Script
    const googleRes = await fetch(
      "https://script.google.com/macros/s/AKfycby-wkkrSqOiUXtJIhSxiHk9ilgz3uiuJhYZ7Y_WrQZTQZ_STob8Q6LNw88_V_EVItYN/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!googleRes.ok) {
      throw new Error("Google Script failed");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      },
    );
  } catch (error) {
    console.error("PEC POST ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      },
    );
  }
}
