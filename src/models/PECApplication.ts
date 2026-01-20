import mongoose, { Schema, model, models } from "mongoose";

export interface IPECApplication {
  fullName: string;
  gender?: string;
  phoneNumber: string;
  address?: string;
  email?: string;
  countryCity?: string;
  maritalStatus?: string;
  bornAgain?: string;
  bornAgainDuration?: string;
  currentChurch?: string;
  seniorPastor?: string;
  servingInChurch?: string;
  roleDepartment?: string;
  calling?: string; // store as comma-separated string
  layMinister?: string;
  previousTraining?: string;
  enrollmentReason?: string;
  strengthenArea?: string;
  fullCommitment?: string;
  participationMode?: string; // comma-separated string
  howHeard?: string;
  agreeToDeclaration?: boolean;
  declarationName?: string;
  declarationDate?: string;
  submittedAt: Date;
}

const PECApplicationSchema = new Schema<IPECApplication>(
  {
    fullName: { type: String, required: true },
    gender: String,
    phoneNumber: { type: String, required: true },
    address: String,
    email: String,
    countryCity: String,
    maritalStatus: String,
    bornAgain: String,
    bornAgainDuration: String,
    currentChurch: String,
    seniorPastor: String,
    servingInChurch: String,
    roleDepartment: String,
    calling: String,
    layMinister: String,
    previousTraining: String,
    enrollmentReason: String,
    strengthenArea: String,
    fullCommitment: String,
    participationMode: String,
    howHeard: String,
    agreeToDeclaration: { type: Boolean, default: false },
    declarationName: String,
    declarationDate: String,
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const PECApplication =
  models.PECApplication ||
  model<IPECApplication>("PECApplication", PECApplicationSchema);
