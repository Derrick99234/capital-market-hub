import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Trade from "@/models/Trades";
import Withdrawal from "@/models/withdrawal";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
  await connectDB();
  const admin = await User.findById(decoded.id);
  if (!admin || admin.role !== "admin") throw new Error("Forbidden");
  return admin;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await requireAdmin(req);
    
    const { userId } = await params;

    // Find user to delete
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deleting admin users
    if (user.role === "admin") {
      return NextResponse.json(
        { error: "Cannot delete admin users" },
        { status: 403 }
      );
    }

    // Delete all user-related data
    // 1. Delete user's trades
    await Trade.deleteMany({ userId });
    
    // 2. Delete user's withdrawals
    await Withdrawal.deleteMany({ userId: userId });
    
    // 3. Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: "User and all associated data deleted successfully",
      deletedUser: {
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
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