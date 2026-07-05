import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/Funding-opportunity";
import Notification from "@/models/Notification";
import User from "@/models/User";

// const users = await User.find();

// for (const user of users) {
//   await Notification.create({
//     userId: user._id,
//     title: "New Funding Opportunity",
//     message: grant.title,
//     type: "Funding",
//   });
// }

// try {
//   await Notification.create({
//     userId: membership.userId,
//     title:
//       "Membership Approved",
//     message:
//       "Your membership has been approved.",
//     type: "Membership",
//   });
// } catch (notifError) {
//   console.error("Notification Failed:", notifError);
// }

export async function GET() {
  try {
    await connectDB();
    const opportunities = await FundingOpportunity.find()
      .populate("agency")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      opportunities,
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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const opportunity = await FundingOpportunity.create(body);

    // notify all users
    const users = await User.find();

    for (const user of users) {
      await Notification.create({
        userId: user._id,
        title: "New Funding Opportunity",
        message: `${opportunity.title} has been added.`,
        type: "Funding",
      });
    }

    return NextResponse.json({
      success: true,
      opportunity,
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
