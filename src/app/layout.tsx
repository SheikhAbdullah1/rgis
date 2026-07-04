import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Research Grant Intelligence System",
//   description: "Research funding opportunities and proposal management platform.",
// };

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://rgis.vercel.app"),
  title: {
    default: "RGIS | Research Grant Intelligence System",
    template: "%s | RGIS",
  },
  description: "Research Grant Intelligence System connects researchers with funding opportunities worldwide.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  
  const adminAuth = cookieStore.get("admin-auth")?.value === "true";
  const userRole  = cookieStore.get("role")?.value || "";
  
  // Admin ya koi bhi logged in user
  const isLoggedIn = adminAuth || !!userRole;
  const role = adminAuth ? "Admin" : userRole;

  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Navbar isLoggedIn={isLoggedIn} userRole={role} />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}