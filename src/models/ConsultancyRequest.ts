// Target path in project: src/models/ConsultancyRequest.ts

import { Schema, model, models, Types } from "mongoose";

export interface IConsultancyRequest {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  service:
    | "Grant Proposal Writing"
    | "Research Design"
    | "Statistical Analysis"
    | "Impact Assessment"
    | "Feasibility Studies"
    | "Startup Funding Support";
  budgetRange?: string;
  details: string;
  status: "New" | "Contacted" | "In Progress" | "Completed" | "Closed";
  createdAt?: Date;
  updatedAt?: Date;
}

const ConsultancyRequestSchema = new Schema<IConsultancyRequest>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    service: {
      type: String,
      enum: [
        "Grant Proposal Writing",
        "Research Design",
        "Statistical Analysis",
        "Impact Assessment",
        "Feasibility Studies",
        "Startup Funding Support",
      ],
      required: true,
    },
    budgetRange: { type: String, trim: true },
    details: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed", "Closed"],
      default: "New",
    },
  },
  { timestamps: true },
);

ConsultancyRequestSchema.index({ status: 1 });
ConsultancyRequestSchema.index({ service: 1 });

export default models.ConsultancyRequest ||
  model<IConsultancyRequest>("ConsultancyRequest", ConsultancyRequestSchema);