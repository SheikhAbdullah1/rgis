import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Proposal from "@/models/Proposal";
import Grant from "@/models/Grant";
import Agency from "@/models/Agency";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const [
      totalUsers,
      totalAgencies,
      totalGrants,
      totalProposals,
      pending,
      approved,
      rejected,
    ] = await Promise.all([
      User.countDocuments(),
      Agency.countDocuments(),
      Grant.countDocuments(),
      Proposal.countDocuments(),
      // Proposal.countDocuments({ status: "Pending" }),
      // Proposal.countDocuments({ status: "Approved" }),
      // Proposal.countDocuments({ status: "Rejected" }),
    ]);
    const submitted = await Proposal.countDocuments({
      status: "Submitted",
    });
    
    const underReview = await Proposal.countDocuments({
      status: "Under Review",
    });
    
    const approved = await Proposal.countDocuments({
      status: "Approved",
    });
    
    const rejected = await Proposal.countDocuments({
      status: "Rejected",
    });
    const successRate =
      totalProposals === 0
        ? 0
        : Number(((approved / totalProposals) * 100).toFixed(1));

    /* ---------------- Proposal Status ---------------- */

    const proposalStatus = [
      {
        name: "Pending",
        value: pending,
      },
      {
        name: "Approved",
        value: approved,
      },
      {
        name: "Rejected",
        value: rejected,
      },
    ];

    /* ---------------- Monthly Trend ---------------- */

    const monthly = await Proposal.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          proposals: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $limit: 6,
      },
    ]);

    /* ---------------- Funding Trend ---------------- */

    const funding = await Proposal.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          requested: {
            $sum: {
              $convert: {
                input: "$funding",
                to: "double",
                onError: 0,
                onNull: 0,
              },
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    /* ---------------- Recommendations ---------------- */

    const recommendations: string[] = [];

    if (pending > approved) {
      recommendations.push(
        "A high number of proposals are pending review. Consider assigning additional reviewers."
      );
    }

    if (approved > 0) {
      recommendations.push(
        `Current proposal approval rate is ${successRate}%.`
      );
    }

    if (rejected > approved) {
      recommendations.push(
        "Rejected proposals exceed approved proposals. Review evaluation criteria."
      );
    }

    if (totalGrants < 10) {
      recommendations.push(
        "Adding more funding opportunities could increase proposal submissions."
      );
    }

    if (totalAgencies < 5) {
      recommendations.push(
        "Consider onboarding additional funding agencies."
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "The system is operating normally."
      );
    }

    /* ---------------- Top Agencies ---------------- */

    const topAgencies = await Proposal.aggregate([
      {
        $match: {
          agency: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$agency",
          proposals: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          proposals: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "agencies",
          localField: "_id",
          foreignField: "_id",
          as: "agency",
        },
      },
      {
        $unwind: "$agency",
      },
      {
        $project: {
          _id: 0,
          name: "$agency.name",
          proposals: 1,
        },
      },
    ]);

    /* ---------------- Recent Proposals ---------------- */

    // const recentProposals = await Proposal.find()
    //   .populate("agency", "name")
    //   .populate("grant", "title")
    //   .sort({ createdAt: -1 })
    //   .limit(10)
    //   .lean();

    /* ---------------- Dashboard Stats ---------------- */

    const stats = {
      totalUsers,
      totalAgencies,
      totalGrants,
      totalProposals,
      pending,
      approved,
      rejected,
      successRate,
    };

    return NextResponse.json({
      success: true,
      stats,
      proposalStatus,
      monthly,
      funding,
      topAgencies,
      recommendations,
      recentProposals,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard analytics.",
      },
      {
        status: 500,
      }
    );
  }
}