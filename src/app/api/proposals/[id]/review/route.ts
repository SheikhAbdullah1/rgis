import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendEmail";

import Proposal from "@/models/Proposal";
import Notification from "@/models/Notification";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Params,
) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;
    const reviewerId = cookieStore.get("userId")?.value;

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

    const { id } = await params;

    const body = await req.json();

    const { status, comment } = body;

    const allowedStatus = [
      "Pending",
      "Under Review",
      "Approved",
      "Rejected",
      "Revision Requested",
    ];

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid proposal status.",
        },
        {
          status: 400,
        },
      );
    }

    const proposal = await Proposal.findById(id);

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

    proposal.status = status;
    proposal.reviewComment = comment || "";
    proposal.reviewedBy = reviewerId;
    proposal.reviewedAt = new Date();

    proposal.statusHistory.push({
      status,
      comment,
      changedBy: reviewerId,
      changedAt: new Date(),
    });

    await proposal.save();

    try {
      await Notification.create({
        userId: proposal.userId,
        title: "Proposal Updated",
        message: `Your proposal ${proposal.trackingId} has been ${status}.`,
        type: "Proposal",
      });
    } catch (error) {
      console.error("Notification Error:", error);
    }

    try {
      await sendEmail(
        proposal.email,
        `Proposal ${status}`,
        `
        <h2>Proposal Status Updated</h2>

        <p>Dear <strong>${proposal.fullName}</strong>,</p>

        <p>Your proposal status has been updated.</p>

        <table cellpadding="6">
            <tr>
                <td><strong>Tracking ID</strong></td>
                <td>${proposal.trackingId}</td>
            </tr>

            <tr>
                <td><strong>Status</strong></td>
                <td>${status}</td>
            </tr>

            ${
              comment
                ? `
            <tr>
                <td><strong>Reviewer Comment</strong></td>
                <td>${comment}</td>
            </tr>
            `
                : ""
            }
        </table>

        <br>

        <p>Regards,</p>
        <p><strong>RGIS Team</strong></p>
        `,
      );
    } catch (error) {
      console.error("Email Error:", error);
    }

    const updatedProposal = await Proposal.findById(id)
      .populate("agency", "name")
      .populate("grant", "title")
      .populate("reviewedBy", "name email");

    return NextResponse.json(
      {
        success: true,
        message: "Proposal reviewed successfully.",
        proposal: updatedProposal,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Review Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to review proposal.",
      },
      {
        status: 500,
      },
    );
  }
}