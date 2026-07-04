import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const userId =
      cookieStore.get("userId")?.value;

    const role =
      cookieStore.get("role")?.value;

    let proposals;

    if (role === "Admin") {
      proposals =
        await Proposal.find().sort({
          createdAt: -1,
        });
    } else {
      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      proposals =
        await Proposal.find({
          userId,
        }).sort({
          createdAt: -1,
        });
    }

    return NextResponse.json({
      success: true,
      proposals,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load proposals",
      },
      {
        status: 500,
      }
    );
  }
}