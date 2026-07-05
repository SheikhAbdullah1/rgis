import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/Funding-opportunity";

export async function GET() {
  try {
    await connectDB();
    const grants = await FundingOpportunity.find()
      .populate("agency")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, grants });
  } catch (error) {
    console.error("Grants fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch grants" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const grant = await FundingOpportunity.create(body);
    return NextResponse.json({ success: true, grant }, { status: 201 });
  } catch (error) {
    console.error("Grant create error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create grant" },
      { status: 500 },
    );
  }
}
