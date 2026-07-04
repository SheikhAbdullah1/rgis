// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Membership from "@/models/Membership";
// import { cookies } from "next/headers";

// export async function GET() {
//   await connectDB();

//   const cookieStore = await cookies();

//   const role = cookieStore.get("role")?.value;

//   const userId = cookieStore.get("userId")?.value;

//   let memberships;

//   if (role === "Admin") {
//     memberships = await Membership.find().populate("userId").sort({
//       createdAt: -1,
//     });
//   } else {
//     memberships = await Membership.find({
//       userId,
//     }).sort({
//       createdAt: -1,
//     });
//   }

//   return NextResponse.json({
//     success: true,
//     memberships,
//   });
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const cookieStore = await cookies();

//     const userId = cookieStore.get("userId")?.value;

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Login required",
//         },
//         {
//           status: 401,
//         },
//       );
//     }

//     const body = await req.json();

//     const membership = await Membership.create({
//       userId,
//       ...body,
//     });

//     return NextResponse.json({
//       success: true,
//       membership,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Membership from "@/models/Membership";

export async function GET() {
  try {
    await connectDB();

    const memberships =
      await Membership.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      memberships,
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