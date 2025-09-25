import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/mailer";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "If that email exists, a reset link was sent" },
        { status: 200 }
      );
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?email=${user.email}&token=${token}`;

    const html = `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetUrl}" target="_blank" style="color: blue;">Reset Password</a>
      <p>If you did not request this, you can safely ignore this email.</p>
    `;

    await sendEmail(user.email, "Password Reset", html);

    return NextResponse.json(
      { message: "Reset link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
