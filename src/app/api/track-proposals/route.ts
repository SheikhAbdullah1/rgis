import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const trackingId =
      req.nextUrl.searchParams.get("trackingId")?.trim();

    if (!trackingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Tracking ID is required",
        },
        { status: 400 }
      );
    }

    const proposal =
      await Proposal.findOne({
        trackingId,
      }).select(
        "title fullName status trackingId createdAt"
      );

    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Proposal not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      proposal,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}