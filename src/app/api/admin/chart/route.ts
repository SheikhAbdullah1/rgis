import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Proposal from "@/models/Proposal";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const proposalStats = await Proposal.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      proposalStats,
      userGrowth,
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
