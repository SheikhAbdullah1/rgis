// import mongoose, {
//     Schema,
//   } from "mongoose";
  
//   const FundingOpportunitySchema =
//     new Schema(
//       {
//         title: String,
  
//         agency: {
//           type:
//             mongoose.Schema.Types.ObjectId,
//           ref: "Agency",
//         },
  
//         country: String,
//         amount: String,
//         deadline: String,
//         description: String,
//       },
//       {
//         timestamps: true,
//       }
//     );
  
//   export default
//     mongoose.models
//       .FundingOpportunity ||
//     mongoose.model(
//       "FundingOpportunity",
//       FundingOpportunitySchema
//     );

import mongoose, { Schema } from "mongoose";

const FundingOpportunitySchema = new Schema(
  {
    title: { type: String, required: true },
    agency: String,        // ObjectId ki jagah String — naam store hoga
    country: String,
    amount: String,
    deadline: String,
    description: String,
    category: String,
    status: { type: String, default: "Open" },
  },
  { timestamps: true }
);

export default
  mongoose.models.FundingOpportunity ||
  mongoose.model("FundingOpportunity", FundingOpportunitySchema);