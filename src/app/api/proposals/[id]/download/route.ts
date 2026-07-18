import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import fs from "fs/promises";
import path from "path";

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

    if (!proposal.proposalFile) {
      return NextResponse.json(
        {
          success: false,
          message: "No proposal file found.",
        },
        {
          status: 404,
        },
      );
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      proposal.proposalFile,
    );

    const fileBuffer = await fs.readFile(filePath);

    const extension = path.extname(filePath).toLowerCase();

    let contentType =
      "application/octet-stream";

    switch (extension) {
      case ".pdf":
        contentType = "application/pdf";
        break;

      case ".doc":
        contentType = "application/msword";
        break;

      case ".docx":
        contentType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
    }

    return new NextResponse(fileBuffer, {
      status: 200,

      headers: {
        "Content-Type": contentType,

        "Content-Disposition": `attachment; filename="${path.basename(
          proposal.proposalFile,
        )}"`,
      },
    });
  } catch (error) {
    console.error("Download Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to download proposal.",
      },
      {
        status: 500,
      },
    );
  }
}