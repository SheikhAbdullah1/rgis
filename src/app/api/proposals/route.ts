import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendEmail";

import Proposal from "@/models/Proposal";
import Notification from "@/models/Notification";

// GET
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;
    const role = cookieStore.get("role")?.value;

    let proposals;

    if (role === "Admin") {
      proposals = await Proposal.find({})
        .populate("agency", "name")
        .populate("grant", "title")
        .sort({ createdAt: -1 });
    } else {
      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          {
            status: 401,
          },
        );
      }

      proposals = await Proposal.find({
        userId,
      })
        .populate("agency", "name")
        .populate("grant", "title")
        .sort({
          createdAt: -1,
        });
    }

    return NextResponse.json(
      {
        success: true,
        proposals,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("GET Proposal Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch proposals.",
      },
      {
        status: 500,
      },
    );
  }
}
//  POST

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

//  Budget Items 
    let budgetItems: any[] = [];

    try {
      budgetItems = JSON.parse(
        (formData.get("budgetItems") as string) || "[]",
      );

      if (!Array.isArray(budgetItems)) {
        throw new Error();
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid budget data.",
        },
        {
          status: 400,
        },
      );
    }

// Form Data
    const role = (formData.get("role") as string)?.trim();

    const submissionType = (
      formData.get("submissionType") as string
    )?.trim();

    const agencyRaw = formData.get("agency") as string | null;

    const grantRaw = formData.get("grant") as string | null;

    const agency =
      agencyRaw && agencyRaw.trim() !== ""
        ? agencyRaw
        : undefined;

    const grant =
      grantRaw && grantRaw.trim() !== ""
        ? grantRaw
        : undefined;

    const title = (formData.get("title") as string)?.trim();

    const funding = (formData.get("funding") as string)?.trim();

    const description = (
      formData.get("description") as string
    )?.trim();

    const fullName = (
      formData.get("fullName") as string
    )?.trim();

    const email = (formData.get("email") as string)?.trim();

    const phone = (formData.get("phone") as string)?.trim();

    const cnic = (formData.get("cnic") as string)?.trim();

    const country = (formData.get("country") as string)?.trim();

    const website = (formData.get("website") as string)?.trim();

    const organization = (
      formData.get("organization") as string
    )?.trim();

// Authentication 
    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        {
          status: 401,
        },
      );
    }

//  Validations

    if (
      !role ||
      !submissionType ||
      !title ||
      !description ||
      !fullName ||
      !email ||
      !phone ||
      !cnic ||
      !country ||
      !organization
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    const cnicRegex = /^\d{5}-\d{7}-\d$/;

    if (!cnicRegex.test(cnic)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid CNIC format.",
        },
        {
          status: 400,
        },
      );
    }

//  File Upload

    let proposalFile = "";

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

      proposalFile = `/uploads/proposals/${fileName}`;
    }

    // Tracking ID  
    const count = await Proposal.countDocuments();

    const trackingId = `RGIS-${String(count + 1).padStart(3, "0")}`;

    //  Create Proposal
    const proposal = await Proposal.create({
      userId,
      role,
      submissionType,

      agency,
      grant,

      title,
      funding,
      description,

      fullName,
      email,
      phone,
      cnic,

      country,
      website,
      organization,

      proposalFile,
      budgetItems,

      trackingId,

      status: "Pending",

      reviewComment: "",

      statusHistory: [
        {
          status: "Pending",
          comment: "Proposal Submitted",
          changedBy: userId,
          changedAt: new Date(),
        },
      ],
    });
//  Notification 

    try {
      await Notification.create({
        userId,
        title: "Proposal Submitted",
        message: `Your proposal ${trackingId} has been submitted successfully.`,
        type: "Proposal",
      });
    } catch (error) {
      console.error("Notification Error:", error);
    }
// Email

    try {
      await sendEmail(
        proposal.email,
        "Proposal Submitted Successfully",
        `
        <h2>Proposal Submitted Successfully</h2>

        <p>Dear <strong>${proposal.fullName}</strong>,</p>

        <p>Your proposal has been submitted successfully.</p>

        <table cellpadding="6">
            <tr>
                <td><strong>Tracking ID</strong></td>
                <td>${proposal.trackingId}</td>
            </tr>

            <tr>
                <td><strong>Title</strong></td>
                <td>${proposal.title}</td>
            </tr>

            <tr>
                <td><strong>Status</strong></td>
                <td>${proposal.status}</td>
            </tr>
        </table>

        <p>
            We will review your proposal and notify you after evaluation.
        </p>

        <br/>

        <p>
            Regards,<br/>
            RGIS Team
        </p>
        `,
      );
    } catch (error) {
      console.error("Email Error:", error);
    }

// Return Populated Data 
    const populatedProposal = await Proposal.findById(proposal._id)
      .populate("agency", "name")
      .populate("grant", "title");

    return NextResponse.json(
      {
        success: true,
        message: "Proposal submitted successfully.",
        proposal: populatedProposal,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Proposal Submission Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Submission failed. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}