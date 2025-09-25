import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, token } = await req.json();

    if (!email || !password || !token) {
      return NextResponse.json(
        { error: "Email, password, and token are required" },
        { status: 400 }
      );
    }

    // 🔑 Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        email: string;
      };

      if (decoded.email !== email) {
        return NextResponse.json(
          { error: "Token does not match email" },
          { status: 401 }
        );
      }
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
