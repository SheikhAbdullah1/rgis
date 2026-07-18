import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import SDG from "@/models/SDG";
import Funding from "@/models/Funding-opportunity";
import Agency from "@/models/Agency";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;

    const sdg = await SDG.findOne({ slug });

    if (!sdg) {
      return NextResponse.json(
        {
          success: false,
          message: "SDG not found",
        },
        { status: 404 },
      );
    }

    const relatedFunding = await Funding.find({
      sdgs: sdg.number,
    });

    const relatedAgencies = await Agency.find({
      sdgs: sdg.number,
    });

    return NextResponse.json({
      success: true,
      sdg: {
        ...sdg.toObject(),
        relatedFunding,
        relatedAgencies,
      },
    });
  } catch (error: any) {
  console.error("========== SDG API ERROR ==========");
  console.error(error);
  console.error(error?.message);
  console.error(error?.stack);

  return NextResponse.json(
    {
      success: false,
      message: error?.message || "Server Error",
    },
    { status: 500 }
  );
}
  // catch (error) {
  //   console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
