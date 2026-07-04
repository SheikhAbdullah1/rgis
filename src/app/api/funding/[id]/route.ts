import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/FundingOpportunity";

export async function PATCH(
req: NextRequest,
{ params }: any
) {
try {
await connectDB();

const body =
  await req.json();

const opportunity =
  await FundingOpportunity.findByIdAndUpdate(
    params.id,
    body,
    {
      new: true,
    }
  );

return NextResponse.json({
  success: true,
  opportunity,
});
} catch {
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
await FundingOpportunity.findByIdAndDelete(
  params.id
);

return NextResponse.json({
  success: true,
});
} catch {
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
