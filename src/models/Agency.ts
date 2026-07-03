import mongoose, { Schema } from "mongoose";

const AgencySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    logo: String,

    country: String,

    website: String,

    description: String,

    fundingTypes: [String],

    focusAreas: [String],

    email: String,

    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default
  mongoose.models.Agency ||
  mongoose.model(
    "Agency",
    AgencySchema
  );