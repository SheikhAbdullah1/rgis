"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] =
    useState({
      fullName: "",
      email: "",
      password: "",
    });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch(
      "/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data =
      await res.json();

    if (data.success) {
      alert("Account Created");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h1 className="text-3xl font-bold">
        Sign Up
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full rounded border p-3"
        onChange={(e) =>
          setForm({
            ...form,
            fullName:
              e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full rounded border p-3"
        onChange={(e) =>
          setForm({
            ...form,
            email:
              e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded border p-3"
        onChange={(e) =>
          setForm({
            ...form,
            password:
              e.target.value,
          })
        }
      />

      <button
        className="w-full rounded bg-blue-600 p-3 text-white"
      >
        Create Account
      </button>
    </form>
  );
}