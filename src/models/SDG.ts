import mongoose, { Schema, models, model } from "mongoose";

const SDGSchema = new Schema(
  {
    number: Number,
    name: String,
    slug: String,
    color: String,
    description: String,
    icon: String,
    image: String,

    targets: [
      {
        title: String,
        description: String,
      },
    ],

    indicators: [
      {
        title: String,
        description: String,
      },
    ],

    relatedFunding: [
      {
        type: Schema.Types.ObjectId,
        ref: "FundingOpportunity",
      },
    ],

    relatedAgencies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Agency",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default models.SDG || model("SDG", SDGSchema);