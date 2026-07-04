// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";

// export async function POST(req: NextRequest) {
//   try {
//     await connectDB();

//     const {
//       fullName,
//       email,
//       password,
//     } = await req.json();

//     const existingUser =
//       await User.findOne({
//         email,
//       });

//     if (existingUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "User already exists",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const hashedPassword =
//       await bcrypt.hash(password, 10);

//     const user =
//       await User.create({
//         fullName,
//         email,
//         password: hashedPassword,
//       });

//     return NextResponse.json({
//       success: true,
//       message:
//         "Account created successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Server Error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { fullName, email, password } = await req.json();

    // Field check validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const targetEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: targetEmail });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //  Fixed: Mapping 'fullName' from frontend to 'name' for the Mongoose Schema
    const user = await User.create({
      name: fullName.trim(), // ✅ This matches your Schema property 'name'
      email: targetEmail,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error: any) {
    console.error("SIGNUP_API_CRASH:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}