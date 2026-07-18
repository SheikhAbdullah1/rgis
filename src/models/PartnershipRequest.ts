// Target path in project: src/models/PartnershipRequest.ts

import { Schema, model, models, Types } from "mongoose";

export interface IPartnershipRequest {
  _id?: Types.ObjectId;
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  partnerType:
    | "Industrial Partner"
    | "Institutional Partner"
    | "International Partner"
    | "NGO Partner"
    | "Government Organizational Partner";
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  createdAt?: Date;
  updatedAt?: Date;
}

const PartnershipRequestSchema = new Schema<IPartnershipRequest>(
  {
    organizationName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    partnerType: {
      type: String,
      enum: [
        "Industrial Partner",
        "Institutional Partner",
        "International Partner",
        "NGO Partner",
        "Government Organizational Partner",
      ],
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  { timestamps: true },
);

PartnershipRequestSchema.index({ status: 1 });

export default models.PartnershipRequest ||
  model<IPartnershipRequest>("PartnershipRequest", PartnershipRequestSchema);