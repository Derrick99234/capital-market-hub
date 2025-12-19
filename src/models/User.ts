import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: {
    totalBalance: number;
    BTC: number;
    depositBalance: number;
    referralBalance: number;
  };
  phoneNumber?: string;
  country?: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    balance: {
      totalBalance: { type: Number, default: 0 },
      BTC: { type: Number, default: 0 },
      depositBalance: { type: Number, default: 0 },
      referralBalance: { type: Number, default: 0 },
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt automatically
);

// Avoid model overwrite issues in Next.js
const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
