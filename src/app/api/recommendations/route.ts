import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Proposal from "@/models/Proposal";
import FundingOpportunity from "@/models/FundingOpportunity";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const user = await User.findById(userId);

    const proposals = await Proposal.find({
      userId,
    });

    const keywords = [
      ...(user?.interests || []),
      ...proposals.map((p) => p.title),
    ];

    const recommendations = await FundingOpportunity.find({
      $or: keywords.map((word) => ({
        title: {
          $regex: word,
          $options: "i",
        },
      })),
    }).limit(10);

    return NextResponse.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error(error);

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
