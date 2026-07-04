// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import FundingOpportunity from "@/models/FundingOpportunity";
// import { cookies } from "next/headers";

// const role =
//   cookies()
//     .get("role")
//     ?.value;

// if (role !== "Admin") {
//   return NextResponse.json(
//     {
//       success: false,
//       message:
//         "Unauthorized",
//     },
//     {
//       status: 401,
//     }
//   );
// }
// export async function GET() {
//   try {
//     await connectDB();

//     const grants =
//       await FundingOpportunity.find()
//         .populate("agency")
//         .sort({ createdAt: -1 });

//     return NextResponse.json({
//       success: true,
//       grants,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch grants",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const grant =
//       await FundingOpportunity.create(
//         body
//       );

//     return NextResponse.json({
//       success: true,
//       grant,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create grant",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const { id, ...updates } =
//       await req.json();

//     const grant =
//       await FundingOpportunity.findByIdAndUpdate(
//         id,
//         updates,
//         {
//           new: true,
//         }
//       );

//     return NextResponse.json({
//       success: true,
//       grant,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Update failed",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const { id } =
//       await req.json();

//     await FundingOpportunity.findByIdAndDelete(
//       id
//     );

//     return NextResponse.json({
//       success: true,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Delete failed",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import FundingOpportunity from "@/models/FundingOpportunity";

// 🔐 Helper function to check if the incoming request belongs to an Admin
async function isAdminAuthorized() {
  const cookieStore = await cookies(); // ✅ Handles modern async context correctly
  const role = cookieStore.get("role")?.value;
  return role === "Admin";
}

export async function GET() {
  try {
    // 🛡️ Security Guard Layer
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();

    const grants = await FundingOpportunity.find()
      .populate("agency")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      grants,
    });
  } catch (error: any) {
    console.error("GET_GRANTS_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Failed to fetch grants data grid." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const grant = await FundingOpportunity.create(body);

    return NextResponse.json({
      success: true,
      grant,
    });
  } catch (error: any) {
    console.error("CREATE_GRANT_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Failed to create new grant schema." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const { id, ...updates } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Target document ID field is required." }, { status: 400 });
    }

    const grant = await FundingOpportunity.findByIdAndUpdate(
      id,
      updates,
      { new: true } // Return modified object structure instead of legacy document
    );

    return NextResponse.json({
      success: true,
      grant,
    });
  } catch (error: any) {
    console.error("PATCH_GRANT_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Target configuration update failed." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdminAuthorized())) {
      return NextResponse.json({ success: false, message: "Unauthorized access denied." }, { status: 401 });
    }

    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Target document ID field is required." }, { status: 400 });
    }

    await FundingOpportunity.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Grant successfully unlinked and purged.",
    });
  } catch (error: any) {
    console.error("DELETE_GRANT_ERROR:", error.message);
    return NextResponse.json({ success: false, message: "Data destruction execution failed." }, { status: 500 });
  }
}