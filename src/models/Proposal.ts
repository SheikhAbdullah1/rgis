import mongoose, { Schema } from "mongoose";

// const ProposalSchema = new Schema(
//   {
//     title: String,
//     applicantName: String,
//     applicantEmail: String,

//     agency: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Agency",
//     },

//     grant: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "FundingOpportunity",
//     },

//     abstract: String,
//     objectives: String,
//     budget: String,

//     proposalFile: String,

//     status: {
//       type: String,
//       default: "Submitted",
//     },

//     comments: [
//       {
//         text: String,
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

const ProposalSchema = new Schema(
  {
    role: String,
    submissionType: String,
  
    title: String,
    funding: String,
    description: String,
  
    fullName: String,
    email: String,
    phone: String,
    cnic: String,
  
    country: String,
    website: String,
    organization: String,
  
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
    },
  
    grant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FundingOpportunity",
    },
  
    abstract: String,
    objectives: String,
    budget: String,
  
    proposalFile: String,
  
    trackingId: {
      type: String,
      unique: true,
      sparse: true, // Prevents duplicate null crashes on legacy data
    },
    status: {
      type: String,
      default: "Pending",
    },
  
    comments: [
      {
        // text: String,
        user: String,
        message: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
  );

export default
  mongoose.models.Proposal ||
  mongoose.model(
    "Proposal",
    ProposalSchema
  );
