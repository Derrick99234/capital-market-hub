import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import sendNotificationEmail from "@/lib/send-notification";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 },
      );
    }

    // Create JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send login notification email
    try {
      // Get client IP from request headers
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "Unknown";
      await sendNotificationEmail("login", user.email, `${user.firstName} ${user.lastName}`, {
        ip,
        time: new Date().toLocaleString(),
      });
    } catch (emailError) {
      console.error("Failed to send login notification email:", emailError);
      // Continue with login even if email fails
    }

    // Return response with HttpOnly cookie
    const res = NextResponse.json(
      {
        message: "Login successful",
        user: { email: user.email, role: user.role },
      },
      { status: 200 },
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
