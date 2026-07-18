// Target path in project: src/models/Partner.ts

import { Schema, model, models, Types } from "mongoose";

export interface IPartner {
  _id?: Types.ObjectId;
  name: string;
  type:
    | "University"
    | "Industry"
    | "NGO"
    | "Hospital"
    | "Government Department"
    | "International Institution";
  categories: (
    | "Joint Research"
    | "Consultancy"
    | "Technology Transfer"
    | "Startup Development"
    | "Community Projects"
  )[];
  description: string;
  logoUrl?: string;
  website?: string;
  contactEmail?: string;
  city?: string;
  country?: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: [
        "University",
        "Industry",
        "NGO",
        "Hospital",
        "Government Department",
        "International Institution",
      ],
      required: true,
    },
    categories: [
      {
        type: String,
        enum: [
          "Joint Research",
          "Consultancy",
          "Technology Transfer",
          "Startup Development",
          "Community Projects",
        ],
      },
    ],
    description: { type: String, required: true },
    logoUrl: { type: String, trim: true },
    website: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true, default: "Pakistan" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

PartnerSchema.index({ type: 1 });
PartnerSchema.index({ categories: 1 });

export default models.Partner || model<IPartner>("Partner", PartnerSchema);