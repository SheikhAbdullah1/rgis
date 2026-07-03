"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  logout?: () => void;
}

export default function Navbar({ isLoggedIn = false, logout }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Funding", href: "/fundingOpportunities" },
    { label: "Proposal Center", href: "/proposalCenter" },
    { label: "Academy", href: "/trainingAcademy" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
    // {
    //   label: "Proposal History",
    //   href: "/proposalCenter/history",
    // }
  ];

  const handleLogout = () => {
    if (logout) logout();
    setOpen(false);
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          RGIS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link href="/membership">
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Join Membership
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col px-6 py-4 divide-y divide-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-sm font-medium hover:text-blue-600 transition"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="w-full">
                    <button className="w-full px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition">
                      Login
                    </button>
                  </Link>
                  <Link href="/membership" onClick={() => setOpen(false)} className="w-full">
                  {/* <Link href="/signup" onClick={() => setOpen(false)} className="w-full"> */}
                    <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Join Membership
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}