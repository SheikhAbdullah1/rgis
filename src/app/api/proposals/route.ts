import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendEmail } from "@/lib/sendEmail";
import { cookies } from "next/headers";

// export async function GET() {
//   try {
//     await connectDB();
//     // const proposals = await Proposal.find().sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, proposals });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch proposals" },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();

const userId = cookieStore.get("userId")?.value;
const role = cookieStore.get("role")?.value;

let proposals;

if (role === "Admin") {
  proposals = await Proposal.find().sort({
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

  proposals = await Proposal.find({
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
        message: "Failed to fetch proposals",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const role = formData.get("role") as string;
    const submissionType = formData.get("submissionType") as string;
    const title = formData.get("title") as string;
    const funding = formData.get("funding") as string;
    const description = formData.get("description") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const cnic = formData.get("cnic") as string;
    const country = formData.get("country") as string;
    const website = formData.get("website") as string;
    const organization = formData.get("organization") as string;

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    if (!role || !submissionType || !title || !description || !fullName || !email || !phone || !cnic) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    let proposalFile = "";
    const file = formData.get("proposalFile") as File | null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public", "uploads", "proposals");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
      proposalFile = `/uploads/proposals/${fileName}`;
    }

    // const trackingId = `RGIS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const count = await Proposal.countDocuments();
    const num = count + 1;

    const trackingId =
      num < 100
        ? `RGIS-${String(num).padStart(3, "0")}`  // 001 - 099
        : `RGIS-${num}`;  

    const proposal = await Proposal.create({
      userId, role, submissionType, title, funding, description,
      fullName, email, phone, cnic, country, website,
      organization, proposalFile, trackingId, status: "Pending",
    });

     // Email — agar fail ho to proposal save rehta hai
     try {
      await sendEmail(
        proposal.email,
        "Proposal Submitted Successfully",
        `
        <h2>Proposal Submitted</h2>
        <p>Dear ${proposal.fullName},</p>
        <p>Your proposal has been submitted successfully.</p>
        <p>Tracking ID: <strong>${proposal.trackingId}</strong></p>
        <p>Status: Pending</p>
        `
      );
    } catch (emailError) {
      console.error("Email failed:", emailError);
    }

    return NextResponse.json(
      { success: true, message: `Proposal submitted! Tracking ID: ${trackingId}`, proposal },
      { status: 201 }
    );
  } 
  catch (error) {
    console.error("Proposal submission error:", error);
    return NextResponse.json(
      { success: false, message: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
  
}