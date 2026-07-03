import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET() {
  try {
    await connectDB();

    const total =
      await Proposal.countDocuments();

    const pending =
      await Proposal.countDocuments({
        status: "Pending",
      });

    const review =
      await Proposal.countDocuments({
        status: "Under Review",
      });

    const approved =
      await Proposal.countDocuments({
        status: "Approved",
      });

    const rejected =
      await Proposal.countDocuments({
        status: "Rejected",
      });

    return NextResponse.json(
    //     {
    //   success: true,
    //   stats: {
    //     total,
    //     pending,
    //     review,
    //     approved,
    //     rejected,
    //   },
    {
        "success": true,
        "stats": {
          "total": 10,
          "pending": 2,
          "review": 3,
          "approved": 4,
          "rejected": 1
        }
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}