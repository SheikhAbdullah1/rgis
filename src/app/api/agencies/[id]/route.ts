import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";

export async function PUT(
  req: NextRequest,
  { params }: any
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const agency =
      await Agency.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      agency,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: any
) {
  try {
    await connectDB();

    await Agency.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}