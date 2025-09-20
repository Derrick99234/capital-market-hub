// models/Payment.ts
import mongoose, { Schema, model, models } from "mongoose";
import { ObjectId } from "mongoose";

export interface IProduct extends Document {
  userId: ObjectId;
  amount: number;
  currency: string;
  method: string;
  status: string;
  note: string;
}

const PaymentSchema = new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    method: { type: String }, // e.g. "bank_transfer"
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    note: { type: String },
  },
  { timestamps: true }
);

const Payment =
  models.Payment || mongoose.model<IProduct>("Payment", PaymentSchema);
export default Payment;
