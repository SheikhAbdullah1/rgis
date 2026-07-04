// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupForm() {
//   const router = useRouter();

//   const [form, setForm] =
//     useState({
//       fullName: "",
//       email: "",
//       password: "",
//     });

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     const res = await fetch(
//       "/api/signup",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify(form),
//       }
//     );

//     const data =
//       await res.json();

//     if (data.success) {
//       alert("Account Created");
//       router.push("/login");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4"
//     >
//       <h1 className="text-3xl font-bold">
//         Sign Up
//       </h1>

//       <input
//         type="text"
//         placeholder="Full Name"
//         className="w-full rounded border p-3"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             fullName:
//               e.target.value,
//           })
//         }
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full rounded border p-3"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             email:
//               e.target.value,
//           })
//         }
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full rounded border p-3"
//         onChange={(e) =>
//           setForm({
//             ...form,
//             password:
//               e.target.value,
//           })
//         }
//       />

//       <button
//         className="w-full rounded bg-blue-600 p-3 text-white"
//       >
//         Create Account
//       </button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Account created successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
      <p className="mb-8 text-gray-500 text-sm">
        Join RGIS to discover funding opportunities
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500">
          Want premium access?{" "}
          <Link href="/membership" className="text-blue-600 hover:underline">
            Join as Member
          </Link>
        </p>
      </form>
    </div>
  );
}