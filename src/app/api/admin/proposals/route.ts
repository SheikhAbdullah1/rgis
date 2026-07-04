import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

// 🔐 Helper function to check if the user is an Admin
async function isAdminAuthorized() {
  const cookieStore = await cookies(); // Handles modern async cookie context
  const role = cookieStore.get("role")?.value;
  return role === "Admin";
}

// 1. GET — List all proposals or return dashboard statistics (🛡️ Admin Only)
export async function GET(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const getStats = searchParams.get("stats") === "true";

    if (getStats) {
      const [total, pending, approved, rejected, review] = await Promise.all([
        Proposal.countDocuments(),
        Proposal.countDocuments({ status: "Pending" }),
        Proposal.countDocuments({ status: "Approved" }),
        Proposal.countDocuments({ status: "Rejected" }),
        Proposal.countDocuments({ status: "Under Review" }),
      ]);
      return NextResponse.json({
        success: true,
        stats: { total, pending, approved, rejected, review },
      });
    }

    const proposals = await Proposal.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, proposals });
  } catch (error) {
    console.error("GET Proposals Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}

// 2. POST — Submit a new proposal (🌍 Open to all Authenticated/Registered Users)
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const role           = formData.get("role") as string;
    const submissionType = formData.get("submissionType") as string;
    const title          = formData.get("title") as string;
    const funding        = formData.get("funding") as string;
    const description    = formData.get("description") as string;
    const fullName       = formData.get("fullName") as string;
    const email          = formData.get("email") as string;
    const phone          = formData.get("phone") as string;
    const cnic           = formData.get("cnic") as string;
    const country        = formData.get("country") as string;
    const website        = formData.get("website") as string;
    const organization   = formData.get("organization") as string;

    // Required Field Validation
    if (!role || !submissionType || !title || !description || !fullName || !email || !phone || !cnic) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Process and Clean File Upload
    let proposalFileUrl = "";
    const file = formData.get("proposalFile") as File | null;

    if (file && file.size > 0) {
      const bytes  = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads", "proposals");
      await mkdir(uploadDir, { recursive: true });

      // Strip out spaces and reserved URL characters safely
      const sanitizedName = file.name
        .replace(/[^a-zA-Z0-9.\-_]/g, "_")
        .replace(/__+/g, "_");

      const fileName = `${Date.now()}_${sanitizedName}`;
      await writeFile(path.join(uploadDir, fileName), buffer);

      proposalFileUrl = `/uploads/proposals/${fileName}`;
    }

    // Unique tracking ID generation
    const trackingId = `RGIS-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    const proposal = await Proposal.create({
      role,
      submissionType,
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
      proposalFile: proposalFileUrl,
      trackingId,
      status: "Pending", 
    });

    return NextResponse.json(
      {
        success: true,
        message: `Proposal submitted successfully! Your Tracking ID: ${trackingId}`,
        proposal,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Proposal submission error:", error);
    return NextResponse.json(
      { success: false, message: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}

// 3. PATCH — Update an existing proposal's status (🛡️ Admin Only)
export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const { id, status } = await req.json();

    const proposal = await Proposal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!proposal) {
      return NextResponse.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, proposal });
  } catch (error) {
    console.error("PATCH Proposals Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update" },
      { status: 500 }
    );
  }
}

// 4. DELETE — Remove a proposal from the collection (🛡️ Admin Only)
export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const { id } = await req.json();
    
    const deletedProposal = await Proposal.findByIdAndDelete(id);
    if (!deletedProposal) {
      return NextResponse.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Proposal deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Proposals Error:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}