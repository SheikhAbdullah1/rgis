import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  await connectDB();

  const agency =
    await Agency.findById(
      params.id
    );

  return NextResponse.json({
    success: true,
    agency,
  });
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
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
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  await connectDB();

  await Agency.findByIdAndDelete(
    params.id
  );

  return NextResponse.json({
    success: true,
  });
}