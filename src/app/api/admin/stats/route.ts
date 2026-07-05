import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Proposal from "@/models/Proposal";
import Membership from "@/models/Membership";
import FundingOpportunity from "@/models/Funding-opportunity";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalProposals = await Proposal.countDocuments();
    const totalMemberships = await Membership.countDocuments();
    const totalFunding = await FundingOpportunity.countDocuments();
    const approvedProposals = await Proposal.countDocuments({
      status: "Approved",
    });
    const pendingProposals = await Proposal.countDocuments({
      status: "Pending",
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProposals,
        totalMemberships,
        totalFunding,
        approvedProposals,
        pendingProposals,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
