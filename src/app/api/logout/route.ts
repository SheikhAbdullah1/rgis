import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete("admin-auth");
  response.cookies.delete("user-auth");
  response.cookies.delete("role");
  response.cookies.delete("userId");

  return response;
}

// export async function POST() {
//   const response =
//     NextResponse.json({
//       success: true,
//     });

//   response.cookies.delete(
//     "admin-auth"
//   );

//   response.cookies.delete(
//     "user-auth"
//   );

//   response.cookies.delete(
//     "role"
//   );

//   response.cookies.delete(
//     "userId"
//   );

//   return response;
// }