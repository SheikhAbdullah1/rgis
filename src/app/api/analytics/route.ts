import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Proposal from "@/models/Proposal";
import Agency from "@/models/Agency";
import FundingOpportunity from "@/models/Funding-opportunity";
import Membership from "@/models/Membership";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalProposals = await Proposal.countDocuments();

    const totalAgencies = await Agency.countDocuments();

    const totalGrants = await FundingOpportunity.countDocuments();

    const totalMemberships = await Membership.countDocuments();

    const pendingProposals = await Proposal.countDocuments({
      status: "Pending",
    });

    const approvedProposals = await Proposal.countDocuments({
      status: "Approved",
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalProposals,
        totalAgencies,
        totalGrants,
        totalMemberships,
        pendingProposals,
        approvedProposals,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
