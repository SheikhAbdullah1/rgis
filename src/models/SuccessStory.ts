// Target path in project: src/models/SuccessStory.ts

import { Schema, model, models, Types } from "mongoose";

export interface ISuccessStory {
  _id?: Types.ObjectId;
  projectTitle: string;
  slug: string;
  researcherName: string;
  institution?: string;
  fundingAmount: string;
  fundingAgency: string;
  impactSummary: string;
  category: "Funded Project" | "Researcher" | "University" | "Startup";
  imageUrl?: string;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const SuccessStorySchema = new Schema<ISuccessStory>(
  {
    projectTitle: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    researcherName: { type: String, required: true, trim: true },
    institution: { type: String, trim: true },
    fundingAmount: { type: String, required: true, trim: true },
    fundingAgency: { type: String, required: true, trim: true },
    impactSummary: { type: String, required: true },
    category: {
      type: String,
      enum: ["Funded Project", "Researcher", "University", "Startup"],
      default: "Funded Project",
    },
    imageUrl: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

SuccessStorySchema.index({ category: 1 });

export default models.SuccessStory ||
  model<ISuccessStory>("SuccessStory", SuccessStorySchema);