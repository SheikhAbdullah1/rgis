import { NextResponse } from "next/server";
import Notification from "@/models/Notification";
import { connectDB } from "@/lib/mongodb";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const { id } = await params;

  await Notification.findByIdAndUpdate(id, {
    read: true,
  });

  return NextResponse.json({
    success: true,
  });
}
