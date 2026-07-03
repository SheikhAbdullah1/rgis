// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] =
//     useState("");

//   const [password, setPassword] =
//     useState("");

//   const [error, setError] =
//     useState("");

//   const handleLogin = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     const res = await fetch(
//       "/api/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       }
//     );

//     const data =
//       await res.json();

//     if (!data.success) {
//       setError(data.message);
//       return;
//     }

//     router.push(
//       "/admin/proposals"
//     );
//   };

//   return (
//     <main className="mx-auto max-w-md py-20 px-6">
//       <h1 className="mb-8 text-3xl font-bold">
//         Admin Login
//       </h1>

//       <form
//         onSubmit={handleLogin}
//         className="space-y-4"
//       >
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) =>
//             setEmail(
//               e.target.value
//             )
//           }
//           className="w-full rounded border p-3"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) =>
//             setPassword(
//               e.target.value
//             )
//           }
//           className="w-full rounded border p-3"
//         />

//         {error && (
//           <p className="text-red-500">
//             {error}
//           </p>
//         )}

//         <button
//           className="w-full rounded bg-blue-600 py-3 text-white"
//         >
//           Login
//         </button>
//         <Link
//   href="/forgot-password"
//   className="text-blue-600"
// >
//   Forgot Password?
// </Link>
//       </form>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Fixed missing import

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Added loading state for UX

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

      // Successful login redirect
      router.push("/admin/proposals");
    } catch (err) {
      setError("Failed to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md py-20 px-6">
      <h1 className="mb-8 text-3xl font-bold">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded py-3 text-white font-medium transition-colors ${
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
      </form>
    </main>
  );
}