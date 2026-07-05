"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      // 🔄 Force next.js to flush stale middleware/cookie caches locally
      router.refresh();

      // 🔀 Dynamic Path Assignment based on User Role returned from backend
      const role = data.user?.role;
      
      if (role === "Admin") {
        router.push("/admin/proposals");
      } else {
        // Normal registered user gets safely redirected to their dashboard hub
        router.push("/proposal-center/history"); 
      }
      router.refresh();

    } catch (err) {
      setError("Failed to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md py-20 px-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded py-3 text-white font-medium transition-colors text-sm ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center pt-2">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center pt-1">
        <p> Don't have an account? &nbsp;
          <Link href="/signup" className="text-sm text-blue-600 hover:underline">
          Sign Up
          </Link>
          </p>
        </div>
      </form>
    </main>
  );
}