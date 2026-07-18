// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Proposal from "@/models/Proposal";

// // Next.js 16 validator fix
// // export default function handler() {
// //   return NextResponse.json({ error: "Use GET/PATCH/DELETE methods" }, { status: 405 });
// // }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     const proposal = await Proposal.findById(id).lean();

//     if (!proposal) {
//       return NextResponse.json(
//         { success: false, message: "Proposal not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, proposal });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch proposal" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     const body = await req.json();
//     const proposal = await Proposal.findByIdAndUpdate(id, body, { new: true });
//     return NextResponse.json({ success: true, proposal });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to update proposal" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     await Proposal.findByIdAndDelete(id);
//     return NextResponse.json({ success: true, message: "Proposal deleted" });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to delete proposal" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import Notification from "@/models/Notification";
import { sendEmail } from "@/lib/sendEmail";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

/* ===========================================
   GET SINGLE PROPOSAL
=========================================== */

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;

    if (role !== "Admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    const proposal = await Proposal.findById(id);

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
      {
        status: 500,
      }
    );
  }
}

/* ===========================================
   PATCH REVIEW
=========================================== */

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {

    await connectDB();

    const cookieStore = await cookies();

    const role =
      cookieStore.get("role")?.value;

    const reviewer =
      cookieStore.get("userId")?.value;

    if (role !== "Admin") {
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

    const { id } = await params;

    const body = await req.json();

    const {
      status,
      adminComment,
    } = body;

    const proposal =
      await Proposal.findById(id);

    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Proposal not found",
        },
        {
          status: 404,
        }
      );
    }

    proposal.status = status;

    proposal.adminComment = adminComment;

    proposal.reviewedBy = reviewer;

    proposal.reviewedAt = new Date();

    await proposal.save();

    /* --------------------------
       Notification
    -------------------------- */

    await Notification.create({

      userId: proposal.userId,

      title: "Proposal Updated",

      message: `Your proposal (${proposal.trackingId}) has been ${status}.`,

      type: "Proposal",

    });

    /* --------------------------
       Email
    -------------------------- */

    try {

      await sendEmail(

        proposal.email,

        `Proposal ${status}`,

        `
          <h2>Proposal Review</h2>

          <p>Dear ${proposal.fullName},</p>

          <p>Your proposal has been reviewed.</p>

          <p>

          <strong>Status:</strong>

          ${status}

          </p>

          <p>

          <strong>Tracking ID:</strong>

          ${proposal.trackingId}

          </p>

          <p>

          <strong>Admin Comment:</strong>

          ${adminComment || "No comments."}

          </p>

        `

      );

    } catch (err) {

      console.error("Email Error", err);

    }

    return NextResponse.json({

      success: true,

      message: "Proposal updated successfully.",

      proposal,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}