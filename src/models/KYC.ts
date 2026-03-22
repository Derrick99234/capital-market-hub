import mongoose, { Schema, Document, models } from "mongoose";
import { ObjectId } from "mongoose";

export interface IKYC extends Document {
  userId: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  address: string;
  idDocumentUrl: string;
  selfieUrl: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const KYCSchema = new Schema<IKYC>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
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
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    idDocumentUrl: {
      type: String,
      required: [true, "ID document is required"],
    },
    selfieUrl: {
      type: String,
      required: [true, "Selfie photo is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const KYC = models.KYC || mongoose.model<IKYC>("KYC", KYCSchema);
export default KYC;
