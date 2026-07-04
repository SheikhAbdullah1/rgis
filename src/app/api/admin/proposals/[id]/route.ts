// export const runtime = "nodejs";
// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Proposal from "@/models/Proposal";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     const proposal = await Proposal.findById(id).lean();

//     if (!proposal) {
//       return NextResponse.json(
//         { success: false, message: "Proposal not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, proposal });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch proposal" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     const body = await req.json();

//     const proposal = await Proposal.findByIdAndUpdate(id, body, { new: true });

//     return NextResponse.json({ success: true, proposal });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to update proposal" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await connectDB();
//     const { id } = await params;
//     await Proposal.findByIdAndDelete(id);
//     return NextResponse.json({ success: true, message: "Proposal deleted" });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to delete proposal" },
//       { status: 500 }
//     );
//   }
// }

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Proposal from "@/models/Proposal";

// Next.js 16 validator fix
export default function handler() {
  return NextResponse.json({ error: "Use GET/PATCH/DELETE methods" }, { status: 405 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const proposal = await Proposal.findById(id).lean();

    if (!proposal) {
      return NextResponse.json(
        { success: false, message: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, proposal });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch proposal" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const proposal = await Proposal.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, proposal });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update proposal" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    await Proposal.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Proposal deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete proposal" },
      { status: 500 }
    );
  }
}