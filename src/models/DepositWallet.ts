import mongoose, { Schema, Document, models } from "mongoose";

export interface IDepositWallet extends Document {
  name: string; // Identifier e.g. "btc", "usdt-trc", "sol"
  label: string; // Display label e.g. "Bitcoin (BTC)", "USDT (TRC20)"
  symbol: string; // e.g. "BTC", "USDT", "ETH", "SOL"
  network?: string; // e.g. "Bitcoin", "TRC20", "ERC20", "Solana"
  walletAddress: string;
  qrCodeUrl: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DepositWalletSchema = new Schema<IDepositWallet>(
  {
    name: {
      type: String,
      required: [true, "Identifier name is required"],
      trim: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: [true, "Display label is required"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      trim: true,
      uppercase: true,
    },
    network: {
      type: String,
      trim: true,
      default: "",
    },
    walletAddress: {
      type: String,
      required: [true, "Wallet address is required"],
      trim: true,
    },
    qrCodeUrl: {
      type: String,
      required: [true, "QR code image URL is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DepositWallet =
  models.DepositWallet ||
  mongoose.model<IDepositWallet>("DepositWallet", DepositWalletSchema);

export default DepositWallet;
