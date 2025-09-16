import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    balance: Number,
    phoneNumber: String,
    country: String,
    currency: String,
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
