"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const res = await fetch(
      "/api/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      }
    );

    const data =
      await res.json();

    setLoading(false);

    alert(data.message);

    if (data.success) {
      router.push("/login");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-6">
      <div className="w-full rounded-xl border p-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 py-3 text-white"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  );
}