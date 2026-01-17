// API endpoint to create admin user
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@capitalmarkethub.com" });
    if (existingAdmin) {
      return NextResponse.json({
        message: "Admin user already exists",
        email: existingAdmin.email,
        role: existingAdmin.role
      });
    }

    // Generate secure password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let plainPassword = '';
    for (let i = 0; i < 16; i++) {
      plainPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    // Create admin user
    const adminUser = new User({
      firstName: "System",
      lastName: "Administrator",
      email: "admin@capitalmarkethub.com",
      password: hashedPassword,
      role: "admin",
      balance: {
        totalBalance: 0,
        BTC: 0,
        depositBalance: 0,
        referralBalance: 0
      },
      dailyTradeLeft: 999, // Unlimited for admin
      currency: "USD",
      country: "System"
    });

    await adminUser.save();

    return NextResponse.json({
      message: "Admin user created successfully!",
      credentials: {
        email: "admin@capitalmarkethub.com",
        password: plainPassword,
        role: "admin"
      },
      warning: "⚠️ Save these credentials securely! This password will not be shown again."
    });

  } catch (error: any) {
    console.error("Create admin error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user", details: error.message },
      { status: 500 }
    );
  }
}