"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Proposals",
    href: "/admin/proposals",
  },
  {
    title: "Agencies",
    href: "/admin/agencies",
  },
  {
    title: "Funding",
    href: "/admin/funding",
  },
  {
    title: "Templates",
    href: "/admin/templates",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Memberships",
    href: "/admin/memberships",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    // icon: BarChart3,
  },
  {
    label: "Courses",
    href: "/admin/courses",
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-10">RGIS Admin </h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-3 transition
          ${pathname === item.href ? "bg-blue-600" : "hover:bg-slate-800"}`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
