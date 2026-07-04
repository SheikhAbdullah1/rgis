"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between border-b p-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <button
        onClick={logout}
        className="rounded-lg bg-red-600 px-5 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}