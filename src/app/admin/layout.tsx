import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}

// export default async function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // ✅ await zaroori hai — getRole() ab async hai
//   const role = await getRole();

//   if (role !== "Admin") {
//     redirect("/login");
//   }

//   return <>{children}</>;
// }