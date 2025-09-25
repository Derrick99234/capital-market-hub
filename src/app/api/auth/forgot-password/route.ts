// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "If email exists, link sent" });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 mins
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${user.email}`;

  // Send email
  const html = `
    <h2>Password Reset Request</h2>
    <p>You requested to reset your password. Click the link below to reset it:</p>
    <a href="${resetUrl}" target="_blank" style="color: blue;">Reset Password</a>
    <p>If you did not request this, you can safely ignore this email.</p>
  `;

  await sendEmail(user.email, "Password Reset", html);

  return NextResponse.json({ message: "Reset link sent to your email" });
}
