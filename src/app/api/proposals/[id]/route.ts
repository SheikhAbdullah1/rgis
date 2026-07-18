import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendEmail";

import Proposal from "@/models/Proposal";
import Notification from "@/models/Notification";

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
      .populate("grant", "title");

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
      {
        status: 500,
      },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params,
) {
  try {
    await connectDB();

    const { id } = await params;

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;
    const role = cookieStore.get("role")?.value;

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

    if (
      proposal.status !== "Pending" &&
      role !== "Admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only pending proposals can be edited.",
        },
        {
          status: 400,
        },
      );
    }

    const formData = await req.formData();

    let budgetItems = [];

    try {
      budgetItems = JSON.parse(
        (formData.get("budgetItems") as string) ||
          "[]",
      );
    } catch {
      budgetItems = [];
    }

    proposal.role = (formData.get("role") as string)?.trim();

    proposal.submissionType = (
      formData.get("submissionType") as string
    )?.trim();

    proposal.title = (
      formData.get("title") as string
    )?.trim();

    proposal.funding = (
      formData.get("funding") as string
    )?.trim();

    proposal.description = (
      formData.get("description") as string
    )?.trim();

    proposal.fullName = (
      formData.get("fullName") as string
    )?.trim();

    proposal.email = (
      formData.get("email") as string
    )?.trim();

    proposal.phone = (
      formData.get("phone") as string
    )?.trim();

    proposal.cnic = (
      formData.get("cnic") as string
    )?.trim();

    proposal.country = (
      formData.get("country") as string
    )?.trim();

    proposal.website = (
      formData.get("website") as string
    )?.trim();

    proposal.organization = (
      formData.get("organization") as string
    )?.trim();

    const agency = formData.get("agency") as string;
    const grant = formData.get("grant") as string;
    
    proposal.agency = agency?.trim() ? agency : undefined;
    proposal.grant = grant?.trim() ? grant : undefined;

    proposal.budgetItems = budgetItems;

// File Upload

    const file = formData.get("proposalFile") as File | null;

    if (file && file.size > 0) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only PDF, DOC and DOCX files are allowed.",
          },
          {
            status: 400,
          },
        );
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum upload size is 10MB.",
          },
          {
            status: 400,
          },
        );
      }

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "proposals",
      );

      await mkdir(uploadDir, {
        recursive: true,
      });

      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

      await writeFile(
        path.join(uploadDir, fileName),
        buffer,
      );

      proposal.proposalFile = `/uploads/proposals/${fileName}`;
    }

    await proposal.save();

    const updatedProposal = await Proposal.findById(
      proposal._id,
    )
      .populate("agency", "name")
      .populate("grant", "title");

    return NextResponse.json({
      success: true,
      message: "Proposal updated successfully.",
      proposal: updatedProposal,
    });
  } catch (error) {
    console.error("PUT Proposal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update proposal.",
      },
      {
        status: 500,
      },
    );
  }
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

    const { status, comment } = await req.json();

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
        message: `Your proposal ${proposal.trackingId} is now ${proposal.status}.`,
        type: "Proposal",
      });
    } catch (error) {
      console.error("Notification Error:", error);
    }

    try {
      await sendEmail(
        proposal.email,
        `Proposal ${proposal.status}`,
        `
        <h2>Proposal Status Updated</h2>

        <p>Hello ${proposal.fullName},</p>

        <p>Your proposal status has been updated.</p>

        <p>
            <strong>Status:</strong> ${proposal.status}
        </p>

        ${
          proposal.reviewComment
            ? `<p><strong>Reviewer Comment:</strong><br>${proposal.reviewComment}</p>`
            : ""
        }

        <p>
            Tracking ID:
            <strong>${proposal.trackingId}</strong>
        </p>

        <br>

        <p>Regards,<br>RGIS Team</p>
        `,
      );
    } catch (error) {
      console.error("Email Error:", error);
    }

    return NextResponse.json({
      success: true,
      message: "Proposal reviewed successfully.",
      proposal,
    });
  } catch (error) {
    console.error("PATCH Proposal Error:", error);

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

// DELETE
export async function DELETE(
  req: NextRequest,
  { params }: Params,
) {
  try {
    await connectDB();

    const { id } = await params;

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;
    const role = cookieStore.get("role")?.value;

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

    // Authorization
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

    // Optional:
    // Prevent users from deleting approved proposals
    if (
      role !== "Admin" &&
      proposal.status !== "Pending"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only pending proposals can be deleted.",
        },
        {
          status: 400,
        },
      );
    }

    await Proposal.findByIdAndDelete(id);

    // Notification
    try {
      await Notification.create({
        userId: proposal.userId,
        title: "Proposal Deleted",
        message: `Your proposal ${proposal.trackingId} has been deleted.`,
        type: "Proposal",
      });
    } catch (error) {
      console.error("Notification Error:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Proposal deleted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE Proposal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete proposal.",
      },
      {
        status: 500,
      },
    );
  }
}