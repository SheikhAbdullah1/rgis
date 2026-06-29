import mongoose, { Schema } from "mongoose";

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
proposalFile: String,
trackingId: String,
status: {
type: String,
default: "Pending",
},
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
