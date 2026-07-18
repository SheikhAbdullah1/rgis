// Target path in project: src/models/CollaborationRequest.ts

import { Schema, model, models, Types } from "mongoose";

export interface ICollaborationRequest {
  _id?: Types.ObjectId;
  requesterName: string;
  requesterEmail: string;
  organization?: string;
  partnerId?: Types.ObjectId;
  category:
    | "Joint Research"
    | "Consultancy"
    | "Technology Transfer"
    | "Startup Development"
    | "Community Projects";
  message: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  createdAt?: Date;
  updatedAt?: Date;
}

const CollaborationRequestSchema = new Schema<ICollaborationRequest>(
  {
    requesterName: { type: String, required: true, trim: true },
    requesterEmail: { type: String, required: true, trim: true },
    organization: { type: String, trim: true },
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner" },
    category: {
      type: String,
      enum: [
        "Joint Research",
        "Consultancy",
        "Technology Transfer",
        "Startup Development",
        "Community Projects",
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

export default models.CollaborationRequest ||
  model<ICollaborationRequest>(
    "CollaborationRequest",
    CollaborationRequestSchema,
  );