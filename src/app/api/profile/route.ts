// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import { cookies } from "next/headers";


// export async function GET() {
//   try {
//     await connectDB();

//     const cookieStore =
//       await cookies();

//     const userId =
//       cookieStore.get("userId")
//         ?.value;

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const user =
//       await User.findById(
//         userId
//       ).select("-password");

//     return NextResponse.json({
//       success: true,
//       user,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
// export async function GET() {
//   try {
//     await connectDB();

//     // abhi temporary
//     const user = await User.findOne();

//     return NextResponse.json({
//       success: true,
//       user,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest
// ) {
//   try {
//     await connectDB();

//     const cookieStore =
//       await cookies();

//     const userId =
//       cookieStore.get("userId")
//         ?.value;

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const body =
//       await req.json();

//     const user =
//       await User.findByIdAndUpdate(
//         userId,
//         body,
//         {
//           new: true,
//         }
//       );

//     return NextResponse.json({
//       success: true,
//       user,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";

// ==========================================
// GET: Fetch authenticated user details
// ==========================================
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Exclude password from being sent to frontend
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH: Update user details safely
// ==========================================
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // 💡 SECURITY FIX: Only extract fields the user is allowed to update
    // Do NOT pass the whole 'body' directly to avoid malicious field injections (like role updates)
    const { name, email, profilePicture } = body; 
    
    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}