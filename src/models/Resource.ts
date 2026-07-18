// Target path in project: src/models/Resource.ts

import { Schema, model, models, Types } from "mongoose";

export interface IResource {
  _id?: Types.ObjectId;
  title: string;
  category:
    | "E-books"
    | "Guides"
    | "Funding Manuals"
    | "Proposal Samples"
    | "Policy Documents"
    | "Research Toolkits";
  description: string;
  fileUrl: string;
  fileType: "pdf" | "docx" | "xlsx" | "pptx" | "zip";
  fileSizeKb?: number;
  downloadCount?: number;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "E-books",
        "Guides",
        "Funding Manuals",
        "Proposal Samples",
        "Policy Documents",
        "Research Toolkits",
      ],
      required: true,
    },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true, trim: true },
    fileType: {
      type: String,
      enum: ["pdf", "docx", "xlsx", "pptx", "zip"],
      required: true,
    },
    fileSizeKb: { type: Number },
    downloadCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

ResourceSchema.index({ category: 1 });
ResourceSchema.index({ title: "text", description: "text" });

export default models.Resource || model<IResource>("Resource", ResourceSchema);