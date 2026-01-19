import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    connectDB();
    // Parse incoming FormData
    const formData = await req.formData();
    const data: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      data[key] = String(value);
    }

    // Basic validation
    if (!data.fullName || !data.phoneNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Forward to Google Apps Script
    const googleRes = await fetch(
      "https://script.google.com/macros/s/AKfycby-wkkrSqOiUXtJIhSxiHk9ilgz3uiuJhYZ7Y_WrQZTQZ_STob8Q6LNw88_V_EVItYN/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!googleRes.ok) {
      throw new Error("Google Script failed");
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
