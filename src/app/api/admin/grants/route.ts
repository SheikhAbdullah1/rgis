import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/FundingOpportunity";

export async function GET() {
  try {
    await connectDB();

    const grants =
      await FundingOpportunity.find()
        .populate("agency")
        .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      grants,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch grants",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const body = await req.json();

    const grant =
      await FundingOpportunity.create(
        body
      );

    return NextResponse.json({
      success: true,
      grant,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create grant",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest
) {
  try {
    await connectDB();

    const { id, ...updates } =
      await req.json();

    const grant =
      await FundingOpportunity.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      grant,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest
) {
  try {
    await connectDB();

    const { id } =
      await req.json();

    await FundingOpportunity.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 }
    );
  }
}