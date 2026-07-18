import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const role = cookieStore.get("role")?.value;

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

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const agency = searchParams.get("agency");
    const grant = searchParams.get("grant");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const query: any = {};

    if (status) query.status = status;

    if (agency) query.agency = agency;

    if (grant) query.grant = grant;

    if (from || to) {
      query.createdAt = {};

      if (from) {
        query.createdAt.$gte = new Date(from);
      }

      if (to) {
        query.createdAt.$lte = new Date(to);
      }
    }

    const proposals = await Proposal.find(query)
      .populate("agency", "name")
      .populate("grant", "title")
      .sort({
        createdAt: -1,
      });

    const headers = [
      "Tracking ID",
      "Title",
      "Applicant",
      "Email",
      "Organization",
      "Agency",
      "Grant",
      "Funding",
      "Status",
      "Submitted On",
    ];

    const rows = proposals.map((proposal: any) => [
      proposal.trackingId,
      proposal.title,
      proposal.fullName,
      proposal.email,
      proposal.organization,
      proposal.agency?.name || "",
      proposal.grant?.title || "",
      proposal.funding || "",
      proposal.status,
      new Date(proposal.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="proposals.csv"',
      },
    });
  } catch (error) {
    console.error("Export Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to export proposals.",
      },
      {
        status: 500,
      },
    );
  }
}