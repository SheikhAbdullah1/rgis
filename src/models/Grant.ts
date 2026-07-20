import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGrant extends Document {
  title: string;
  agency: mongoose.Types.ObjectId;
  description?: string;
  fundingAmount?: number;
  currency?: string;
  deadline?: Date;
  eligibility?: string;
  category?: string;
  status: "Open" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const GrantSchema = new Schema<IGrant>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    agency: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    fundingAmount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "PKR",
    },

    deadline: {
      type: Date,
    },

    eligibility: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

const Grant: Model<IGrant> =
  mongoose.models.Grant ||
  mongoose.model<IGrant>("Grant", GrantSchema);

export default Grant;