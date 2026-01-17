import mongoose, { Schema, Document } from "mongoose";

export interface ITrade extends Document {
  userId: mongoose.Types.ObjectId;
  type: "BUY" | "SELL";
  assetClass: string;
  assetTicker: string;
  tradeAmount: number;
  profitAmount: number;
  duration: string;
  profitLoss: number;
  status: "PENDING" | "WIN" | "LOSS";
  createdAt: Date;
}

const TradeSchema = new Schema<ITrade>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    assetClass: {
      type: String,
      required: true,
    },
    assetTicker: {
      type: String,
      required: true,
    },
    tradeAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    duration: {
      type: String,
      required: true,
    },
    profitAmount: {
      type: Number,
      default: 0,
    },
    profitLoss: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "WIN", "LOSS"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Trade ||
  mongoose.model<ITrade>("Trade", TradeSchema);
