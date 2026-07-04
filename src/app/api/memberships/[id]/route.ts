import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Membership from "@/models/Membership";
import Notification from "@/models/Notification";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const membership = await Membership.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!membership) {
      return NextResponse.json(
        {
          success: false,
          message: "Membership not found",
        },
        {
          status: 404,
        },
      );
    }

    try {
      if (body.status === "Approved") {
        await Notification.create({
          userId: membership.userId,
          title: "Membership Approved",
          message: "Your membership has been approved.",
          type: "Membership",
        });
      }

      if (body.status === "Rejected") {
        await Notification.create({
          userId: membership.userId,
          title: "Membership Rejected",
          message: "Your membership has been rejected.",
          type: "Membership",
        });
      }
    } catch (e) {
      console.error("Notification Error:", e);
    }

    return NextResponse.json({
      success: true,
      membership,
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
