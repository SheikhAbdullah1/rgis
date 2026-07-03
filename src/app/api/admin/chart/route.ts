import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET() {
  try {
    await connectDB();

    const proposals =
      await Proposal.find();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = months.map(
      (month, index) => {
        const count =
          proposals.filter((p) => {
            const date =
              new Date(
                p.createdAt
              );

            return (
              date.getMonth() ===
              index
            );
          }).length;

        return {
          month,
          count,
        };
      }
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}