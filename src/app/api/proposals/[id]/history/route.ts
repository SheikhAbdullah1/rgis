import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params,
) {
  try {
    await connectDB();

    const { id } = await params;

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;
    const userId = cookieStore.get("userId")?.value;

    const proposal = await Proposal.findById(id)
      .populate("agency", "name")
      .populate("grant", "title")
      .populate("reviewedBy", "name email")
      .populate(
        "statusHistory.changedBy",
        "name email role",
      );

    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Proposal not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (
      role !== "Admin" &&
      proposal.userId.toString() !== userId
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        history: proposal.statusHistory,

        currentStatus: proposal.status,

        reviewComment: proposal.reviewComment,

        reviewedBy: proposal.reviewedBy,

        reviewedAt: proposal.reviewedAt,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("History Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch proposal history.",
      },
      {
        status: 500,
      },
    );
  }
}