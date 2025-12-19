// models/Payment.ts
import mongoose, { Schema, model, models } from "mongoose";
import { ObjectId } from "mongoose";

export interface IWithdrawal extends Document {
  userId: ObjectId;
  amount: number;
  currency: string;
  method: string;
  status: string;
  note: string;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
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

const Withdrawal =
  models.Withdrawal ||
  mongoose.model<IWithdrawal>("Withdrawal", WithdrawalSchema);
export default Withdrawal;
