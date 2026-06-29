import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    console.log("1. API HIT");

    await connectDB();
    console.log(
      "readyState:",
      mongoose.connection.readyState
    );
    console.log("2. DB Connected");
    console.log(
      "DB Name:",
      mongoose.connection.db?.databaseName
    );
    console.log(
      "db:",
      mongoose.connection.db?.databaseName
    );
    // console.log(
    //   "Collection:",
    //   proposal.collection.name
    // );


    if (mongoose.connection.readyState !== 1) {
      throw new Error(
        "MongoDB connection failed"
      );
    }
    
    const formData = await req.formData();
    console.log("3. Form Data Received");

    const file = formData.get("proposalFile") as File;

    let filePath = "";

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "proposals"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName =
        `${Date.now()}-${file.name}`;

      filePath =
        `/uploads/proposals/${fileName}`;

      await writeFile(
        path.join(uploadDir, fileName),
        buffer
      );

      console.log("4. File Saved");
    }

    // const proposal =
    // console.log("Before save");
    //   await Proposal.create({
    //     console.log("Saved Proposal:", proposal);
    //     role: formData.get("role"),
    //     submissionType:
    //       formData.get("submissionType"),
    //     title: formData.get("title"),
    //     funding: formData.get("funding"),
    //     description:
    //       formData.get("description"),
    //     fullName:
    //       formData.get("fullName"),
    //     email: formData.get("email"),
    //     phone: formData.get("phone"),  
    //     cnic: formData.get("cnic"),
    //     country:
    //       formData.get("country"),
    //     website:
    //       formData.get("website"),
    //     organization:
    //       formData.get("organization"),
    //     proposalFile: filePath,
    //     trackingId:
    //       `RGIS-${Date.now()}`,
    //   });

    // console.log("5. Proposal Saved");
    // console.log(proposal);
    const proposal = await Proposal.create({
      role: formData.get("role"),
      submissionType: formData.get("submissionType"),
      title: formData.get("title"),
      funding: formData.get("funding"),
      description: formData.get("description"),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      cnic: formData.get("cnic"),
      country: formData.get("country"),
      website: formData.get("website"),
      organization: formData.get("organization"),
      proposalFile: filePath,
      trackingId: `RGIS-${Date.now()}`,
    });
    
    console.log("5. Proposal Saved");
    console.log(proposal);

    return NextResponse.json({
      success: true,
      message: "Proposal submitted successfully.",
      proposal,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}