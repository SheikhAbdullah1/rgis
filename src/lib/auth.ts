// import { cookies }
// from "next/headers";

// export function getRole() {
//   return (
//     cookies()
//       .get("role")
//       ?.value || null
//   );
// }

import { cookies } from "next/headers";

export async function getRole() {
  const cookieStore = await cookies();
  return cookieStore.get("role")?.value || null;
}

export async function isAdmin() {
  const role = await getRole();
  return role === "Admin";
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin-auth")?.value;
  const role = cookieStore.get("role")?.value;
  return adminAuth === "true" || !!role;
}