// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { connectDB } from "@/lib/mongodb";

// export async function GET() {
//   try {
//     await connectDB();

//     return NextResponse.json({
//       state: mongoose.connection.readyState,
//       db: mongoose.connection.db?.databaseName,
//     });
//   } catch (err) {
//     return NextResponse.json({
//       error: String(err),
//     });
//   }
// }