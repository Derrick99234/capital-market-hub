import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      country,
      currency,
    } = await req.json();

    // ✅ Required field validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
      country: country || null,
      currency: currency || "USD", // default currency if not provided
      balance: 0, // default starting balance
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
