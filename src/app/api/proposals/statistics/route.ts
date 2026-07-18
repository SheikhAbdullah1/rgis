import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;

    if (role !== "Admin") {
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

    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const startOfWeek = new Date();

    startOfWeek.setDate(today.getDate() - 7);

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    const [
      total,
      pending,
      underReview,
      approved,
      rejected,
      revisionRequested,
      todayCount,
      weekCount,
      monthCount,
    ] = await Promise.all([
      Proposal.countDocuments(),

      Proposal.countDocuments({
        status: "Pending",
      }),

      Proposal.countDocuments({
        status: "Under Review",
      }),

      Proposal.countDocuments({
        status: "Approved",
      }),

      Proposal.countDocuments({
        status: "Rejected",
      }),

      Proposal.countDocuments({
        status: "Revision Requested",
      }),

      Proposal.countDocuments({
        createdAt: {
          $gte: startOfToday,
        },
      }),

      Proposal.countDocuments({
        createdAt: {
          $gte: startOfWeek,
        },
      }),

      Proposal.countDocuments({
        createdAt: {
          $gte: startOfMonth,
        },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,

        statistics: {
          total,

          pending,

          underReview,

          approved,

          rejected,

          revisionRequested,

          today: todayCount,

          thisWeek: weekCount,

          thisMonth: monthCount,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Statistics Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch statistics.",
      },
      {
        status: 500,
      },
    );
  }
}