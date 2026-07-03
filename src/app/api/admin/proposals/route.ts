// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Proposal from "@/models/Proposal";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// // GET — list all proposals
// export async function GET() {
//   try {
//     await connectDB();
//     const proposals = await Proposal.find().sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, proposals });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch proposals" },
//       { status: 500 }
//     );
//   }
// }

// // POST — submit new proposal
// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     const role           = formData.get("role") as string;
//     const submissionType = formData.get("submissionType") as string;
//     const title          = formData.get("title") as string;
//     const funding        = formData.get("funding") as string;
//     const description    = formData.get("description") as string;
//     const fullName       = formData.get("fullName") as string;
//     const email          = formData.get("email") as string;
//     const phone          = formData.get("phone") as string;
//     const cnic           = formData.get("cnic") as string;
//     const country        = formData.get("country") as string;
//     const website        = formData.get("website") as string;
//     const organization   = formData.get("organization") as string;

//     // Validation
//     if (!role || !submissionType || !title || !description || !fullName || !email || !phone || !cnic) {
//       return NextResponse.json(
//         { success: false, message: "Please fill all required fields." },
//         { status: 400 }
//       );
//     }

//     // File upload
//     let proposalFileUrl = "";
//     const file = formData.get("proposalFile") as File | null;

//     if (file && file.size > 0) {
//       const bytes  = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const uploadDir = path.join(process.cwd(), "public", "uploads", "proposals");
//       await mkdir(uploadDir, { recursive: true });

//       const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
//       await writeFile(path.join(uploadDir, fileName), buffer);

//       proposalFileUrl = `/uploads/proposals/${fileName}`;
//     }

//     // Unique tracking ID
//     const trackingId = `RGIS-${Date.now()}-${Math.random()
//       .toString(36)
//       .substring(2, 7)
//       .toUpperCase()}`;

//     // Save to MongoDB — field names match Proposal.ts model exactly
//     const proposal = await Proposal.create({
//       role,
//       submissionType,
//       title,
//       funding,
//       description,
//       fullName,
//       email,
//       phone,
//       cnic,
//       country,
//       website,
//       organization,
//       proposalFile: proposalFileUrl,  // model mein "proposalFile" hai
//       trackingId,                      // unique tracking ID
//       status: "Pending",               // model enum: "Pending" capital P
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: `Proposal submitted successfully! Your Tracking ID: ${trackingId}`,
//         proposal,
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("Proposal submission error:", error);
//     return NextResponse.json(
//       { success: false, message: "Submission failed. Please try again." },
//       { status: 500 }
//     );
//   }
// } 


import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// 1. GET — List all proposals or return dashboard statistics
export async function GET(req: NextRequest) {
  try {
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

// 2. POST — Submit a new proposal with robust filename sanitization
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

      // FIX: Strip out spaces AND dangerous reserved URL characters (#, &, ?, (, ))
      const sanitizedName = file.name
        .replace(/[^a-zA-Z0-9.\-_]/g, "_") // Replaces special characters with underscores
        .replace(/__+/g, "_");              // Collapses duplicate underscores

      const fileName = `${Date.now()}_${sanitizedName}`;
      await writeFile(path.join(uploadDir, fileName), buffer);

      proposalFileUrl = `/uploads/proposals/${fileName}`;
    }

    // Unique tracking ID generation
    const trackingId = `RGIS-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    // Save to Database
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

// 3. PATCH — Update an existing proposal's status
export async function PATCH(req: NextRequest) {
  try {
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

// 4. DELETE — Remove a proposal from the collection
export async function DELETE(req: NextRequest) {
  try {
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



// import {
//   NextRequest,
//   NextResponse,
// } from "next/server";

// import { connectDB } from "@/lib/mongodb";
// import Proposal from "@/models/Proposal";

// export async function GET() {
//   try {
//     await connectDB();

//     const proposals =
//       await Proposal.find()
//         .sort({
//           createdAt: -1,
//         });

//     return NextResponse.json({
//       success: true,
//       proposals,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const {
//       id,
//       status,
//     } = await req.json();

//     const proposal =
//       await Proposal.findByIdAndUpdate(
//         id,
//         {
//           status,
//         },
//         {
//           new: true,
//         }
//       );

//     return NextResponse.json({
//       success: true,
//       proposal,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }