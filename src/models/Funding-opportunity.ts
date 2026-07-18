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
  researchAreas: [
    {
      type: String,
    },
  ],
  
  organizationTypes: [
    {
      type: String,
    },
  ],
  
  countries: [
    {
      type: String,
    },
  ],
  category: String,
  amount: String,

  // country: String,

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
  sdgs: [
    {
      type: Number,
    },
  ],
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
