// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";

// //   export default function LoginPage() {
// //     const router = useRouter();
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [error, setError] = useState("");
// //     const [loading, setLoading] = useState(false);

// //     const handleLogin = async (e: React.FormEvent) => {
// //       e.preventDefault();
// //       setError("");
// //       setLoading(true);

// //       try {
// //         // Pehle admin login try karo
// //       //   const adminRes = await fetch("/api/login", {
// //       //     method: "POST",
// //       //     headers: { "Content-Type": "application/json" 
// //       //     },
// //       //     body: JSON.stringify({ 
// //       //       email, 
// //       //       password }),
// //       //   }
// //       // );
      
// //       const data = await res.json();
// //       if (!data.success) {
// //         setError(
// //           data.message ||
// //             "Invalid credentials"
// //         );
// //         return;
// //       }

// //       if (
// //         data.user.role === "Admin"
// //       ) {
// //         router.push(
// //           "/admin/proposals"
// //         );
// //       } else {
// //         router.push(
// //           "/dashboard"
// //         );
// //       }

// //       router.refresh();
// //     } catch {
// //       setError(
// //         "Failed to connect to the server."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
    
// //   return (
// //     <main className="mx-auto max-w-md py-20 px-6">
// //       <div className="rounded-xl border p-8 shadow-sm">
// //         <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
// //         <p className="mb-8 text-gray-500 text-sm">
// //           Login to your RGIS account
// //         </p>

// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />

// //           {error && <p className="text-sm text-red-500">{error}</p>}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>

// //           <div className="flex justify-between pt-2 text-sm">
// //             <Link href="/forgot-password" className="text-blue-600 hover:underline">
// //               Forgot Password?
// //             </Link>
// //             <Link href="/signup" className="text-blue-600 hover:underline">
// //               New here? Sign Up
// //             </Link>
// //           </div>
// //         </form>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginForm() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         setError(data.message || "Invalid credentials");
//         return;
//       }

//       if (data.user.role === "Admin") {
//         router.push("/admin/proposals");
//       } else {
//         router.push("/dashboard");
//       }

//       router.refresh();
//     } catch {
//       setError("Failed to connect to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="mx-auto max-w-md py-20 px-6">
//       <div className="rounded-xl border p-8 shadow-sm">
//         <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
//         <p className="mb-8 text-gray-500 text-sm">Login to your RGIS account</p>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <div className="flex justify-between pt-2 text-sm">
//             <Link href="/forgot-password" className="text-blue-600 hover:underline">
//               Forgot Password?
//             </Link>
//             <Link href="/signup" className="text-blue-600 hover:underline">
//               New here? Sign Up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid credentials");
        return;
      }

      if (data.user.role === "Admin") {
        router.push("/admin/proposals");
      } else {
        // Change this to "/dashboard" if that's your preferred
        // post-login destination for normal users.
        router.push("/proposal-center/history");
      }

      router.refresh();
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md py-20 px-6">
      <div className="rounded-xl border p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
        <p className="mb-8 text-gray-500 text-sm">Login to your RGIS account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between pt-2 text-sm">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-blue-600 hover:underline">
              New here? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}