"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch(
      "/api/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data =
      await res.json();

    setLoading(false);

    alert(data.message);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center p-6">
      <div className="w-full rounded-xl border p-8">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
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
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </main>
  );
}