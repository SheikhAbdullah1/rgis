import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
// import ProposalForm from "@/components/proposal/ProposalForm";
import type { Metadata } from "next";
import "./globals.css";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>

        <Navbar />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://rgis.vercel.app"),

  title: {
    default: "RGIS | Research Grant Intelligence System",
    template: "%s | RGIS",
  },

  description:
    "Research Grant Intelligence System (RGIS) connects researchers, startups, universities, and organizations with grants, scholarships, fellowships, and funding opportunities worldwide.",

  keywords: [
    "RGIS",
    "Research Grants",
    "Funding Opportunities",
    "Scholarships",
    "Research Proposal",
    "Research Funding",
    "Innovation Grants",
    "Training Academy",
    "Pakistan Research Funding",
  ],

  authors: [
    {
      name: "Research Grant Intelligence System",
    },
  ],

  creator: "RGIS",

  publisher: "RGIS",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "Research Grant Intelligence System",
    description:
      "Connecting researchers and innovators with funding opportunities worldwide.",
    url: "https://rgis.vercel.app",
    siteName: "RGIS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Research Grant Intelligence System",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Research Grant Intelligence System",
    description:
      "Connecting researchers and innovators with funding opportunities worldwide.",
    images: ["/og-image.png"],
  },
};
