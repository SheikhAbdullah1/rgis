// Target path in project: src/models/Event.ts

import { Schema, model, models, Types } from "mongoose";

export interface IEvent {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  type: "Workshop" | "Conference" | "Webinar" | "Grant Clinic" | "Proposal Boot Camp";
  mode: "In-Person" | "Online" | "Hybrid";
  description: string;
  organizer: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  registrationLink?: string;
  capacity?: number;
  seatsTaken?: number;
  imageUrl?: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    type: {
      type: String,
      enum: ["Workshop", "Conference", "Webinar", "Grant Clinic", "Proposal Boot Camp"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["In-Person", "Online", "Hybrid"],
      required: true,
      default: "Online",
    },
    description: { type: String, required: true },
    organizer: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    registrationLink: { type: String, trim: true },
    capacity: { type: Number },
    seatsTaken: { type: Number, default: 0 },
    imageUrl: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

EventSchema.index({ startDate: 1 });
EventSchema.index({ type: 1 });

export default models.Event || model<IEvent>("Event", EventSchema);