import mongoose, { Schema } from "mongoose";

const FundingOpportunitySchema =
new Schema(
{
title: {
type: String,
required: true,
},
  agency: {
    type:
      mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },

  category: String,
  amount: String,

  country: String,

  deadline: Date,

  eligibility: String,

  description: String,

  website: String,

  status: {
    type: String,
    enum: [
      "Open",
      "Closed",
    ],
    default: "Open",
  },
},
{
  timestamps: true,
});

export default
mongoose.models
.FundingOpportunity ||
mongoose.model(
"FundingOpportunity",
FundingOpportunitySchema
);
