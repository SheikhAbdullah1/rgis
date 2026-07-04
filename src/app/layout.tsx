import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers"; // ✅ Added to read cookies on server runtime
import type { Metadata } from "next";
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔄 Read fresh session properties from client requests
  const cookieStore = await cookies();
  // const userRole = cookieStore.get("role")?.value || "";
  // const isLoggedIn = !!cookieStore.get("role"); // User logged-in hai agar role cookie exist karti hai
  const adminAuth = cookieStore.get("admin-auth")?.value;
  const isLoggedIn = adminAuth === "true";
  const userRole = isLoggedIn ? "Admin" : "";

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        {/* ✅ Passing down parameters dynamically */}
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}

// Keep your export const metadata block exactly as it is...
export const metadata: Metadata = {
  metadataBase: new URL("https://rgis.netlify.app"),
  title: {
    default: "RGIS | Research Grant Intelligence System",
    template: "%s | RGIS",
  },
  description: "Research Grant Intelligence System (RGIS)...",
  // ... rest of your metadata
};