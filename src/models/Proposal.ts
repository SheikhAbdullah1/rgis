import mongoose, { Schema, models, model } from "mongoose";

const ProposalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    researchArea: {
      type: String,
      default: "",
    },

    fundingOpportunity: {
      type: Schema.Types.ObjectId,
      ref: "FundingOpportunity",
    },

    fundingAgency: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
    },

    sdgs: [
      {
        type: Number,
      },
    ],
    adminComment:{
      type:String,
      default:""
  },
  
  reviewedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  },
  
  reviewedAt:Date,
  
  updatedAt:{
      type:Date,
      default:Date.now
  },

    budget: {
      type: Number,
      default: 0,
    },
    budgetItems: [
      {
        category: String,
        item: String,
        quantity: Number,
        unitCost: Number,
        total: Number,
        remarks: String,
      },
    ],

    duration: {
      type: String,
      default: "",
    },

    attachments: [
      {
        name: String,
        url: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "Draft",
        "Submitted",
        "Under Review",
        "Revision Required",
        "Approved",
        "Rejected",
        "Funded",
        "Completed",
      ],
      default: "Draft",
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    submittedAt: Date,

    approvedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default models.Proposal || model("Proposal", ProposalSchema);