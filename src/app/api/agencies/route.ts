// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Agency from "@/models/Agency";
// import mongoose from "mongoose";
// // export async function GET() {
// //   try {
// //     console.log("AGENCIES API HIT");

// //     await connectDB();

// //     console.log(
// //       "DB:",
// //       Agency.db.name
// //     );

// //     const agencies =
// //       await Agency.find();

// //     console.log(
// //       "Agencies:",
// //       agencies
// //     );

// //     return NextResponse.json({
// //       success: true,
// //       agencies,
// //     });
// //   } catch (error) {
// //     console.error(
// //       "AGENCY ERROR:",
// //       error
// //     );

// //     return NextResponse.json(
// //       {
// //         success: false,
// //         error:
// //           error instanceof Error
// //             ? error.message
// //             : String(error),
// //       },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     console.log("BODY:", body);

//     const agency =
//       await Agency.create(body);

//     console.log(
//       "CREATED:",
//       agency
//     );

//     console.log(
//       "DB Name:",
//       mongoose.connection.db?.databaseName
//     );
    
//     const agencies = await Agency.find();
    
//     console.log(
//       "Agencies:",
//       agencies
//     );


//     return NextResponse.json({
//       success: true,
//       agency,
//     });
//   } catch (error) {
//     console.log(
//       "POST ERROR:",
//       error
//     );

//     return NextResponse.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Agency from "@/models/Agency";

export async function GET() {
  try {
    await connectDB();
    const agencies = await Agency.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, agencies });
  } catch (error) {
    console.error("AGENCY ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch agencies" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const agency = await Agency.create(body);
    return NextResponse.json({ success: true, agency }, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}