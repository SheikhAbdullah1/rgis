    // "use client";

    // import Link from "next/link";
    // import { useState } from "react";
    // import { Menu, X } from "lucide-react";
    // import { useRouter } from "next/navigation";

    // interface NavbarProps {
    //   isLoggedIn?: boolean;
    //   userRole?: string; // ✅ Added string tracking property
    // }

    // export default function Navbar({ isLoggedIn = false, userRole = "" }: NavbarProps) {
    //   const [open, setOpen] = useState(false);
    //   const router = useRouter();

    //   const navItems = [
    //     { label: "Home", href: "/" },
    //     { label: "Proposal", href: "/proposal-center" },
    //     { label: "Funding", href: "/funding-opportunities" },
    //     { label: "Academy", href: "/training-academy" },
    //     { label: "Membership", href: "/membership" },
    //     { label: "Contact", href: "/contact" },
    //     { label: "SDGs", href: "/sdgs" },
    //   ];

    //   const handleLogout = async () => {
    //     await fetch("/api/logout", {
    //       method: "POST",
    //     }).catch((error) => {
    //       console.log(error);
    //     });
      
    //     setOpen(false);
    //     router.refresh();
    //     router.push("/");
    //   };

    //   return (
    //     <nav className="border-b bg-white sticky top-0 z-50">
    //       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

    //         {/* Logo */}
    //         <Link href="/" className="text-2xl font-bold text-blue-600">
    //           RGIS
    //         </Link>

    //         {/* Desktop Nav Links */}
    //         <div className="hidden items-center gap-8 lg:flex">
    //           {navItems.map((item) => (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className="text-sm font-medium transition hover:text-blue-600"
    //             >
    //               {item.label}
    //             </Link>
    //           ))}

    //           {/* 🛡️ Conditional Role Links (Desktop) */}
    //           {isLoggedIn && userRole === "Admin" && (
    //             <Link href="/admin/proposals" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
    //               Admin Panel
    //             </Link>
    //           )}

    //           {isLoggedIn && userRole !== "Admin" && (
    //             <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
    //               Dashboard
    //             </Link>
    //           )}
    //         </div>

    //         {/* Desktop Auth Buttons */}
    //         <div className="hidden items-center gap-3 lg:flex">
    //           {isLoggedIn ? (
    //             <button
    //               onClick={handleLogout}
    //               className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
    //             >
    //               Logout
    //             </button>
    //           ) : (
    //             <>
    //               <Link href="/login">
    //                 <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
    //                   Login
    //                 </button>
    //               </Link>
                  
    //               <Link href="/signup">
    //                 <button className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
    //                   Sign Up
    //                 </button>
    //               </Link>

    //               <Link href="/membership">
    //                 <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
    //                   Join as Member
    //                 </button>
    //               </Link>
    //             </>
    //           )}
    //         </div>

    //         {/* Mobile Hamburger */}
    //         <button onClick={() => setOpen(!open)} className="lg:hidden text-gray-700">
    //           {open ? <X size={28} /> : <Menu size={28} />}
    //         </button>
    //       </div>

    //       {/* Mobile Menu */}
    //       {open && (
    //         <div className="border-t bg-white lg:hidden">
    //           <div className="flex flex-col px-6 py-4 divide-y divide-gray-100">
    //             {navItems.map((item) => (
    //               <Link
    //                 key={item.href}
    //                 href={item.href}
    //                 onClick={() => setOpen(false)}
    //                 className="py-4 text-sm font-medium hover:text-blue-600 transition"
    //               >
    //                 {item.label}
    //               </Link>
    //             ))}

    //             {/* 🛡️ Conditional Role Links (Mobile) */}
    //             {isLoggedIn && userRole === "Admin" && (
    //               <Link href="/admin/proposals" onClick={() => setOpen(false)} className="py-4 text-sm font-semibold text-purple-600">
    //                 Admin Panel
    //               </Link>
    //             )}

    //             {isLoggedIn && userRole !== "Admin" && (
    //               <Link href="/proposal-center" onClick={() => setOpen(false)} className="py-4 text-sm font-semibold text-blue-600">
    //                 User Dashboard
    //               </Link>
    //             )}

    //             {/* Mobile Auth Buttons */}
    //             <div className="flex flex-col gap-3 pt-4">
    //               {isLoggedIn ? (
    //                 <button
    //                   onClick={handleLogout}
    //                   className="w-full px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
    //                 >
    //                   Logout
    //                 </button>
    //               ) : (
    //                 <>
    //                   <Link href="/login" onClick={() => setOpen(false)}>
    //                     <button className="w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
    //                       Login
    //                     </button>
    //                   </Link>

    //                   <Link href="/signup" onClick={() => setOpen(false)}>
    //                     <button className="w-full px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
    //                       Sign Up
    //                     </button>
    //                   </Link>

    //                   <Link href="/membership" onClick={() => setOpen(false)}>
    //                     <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
    //                       Join as Member
    //                     </button>
    //                   </Link>
    //                 </>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </nav>
    //   );
    // }


    // Target path in project: src/components/layout/Navbar.tsx
// Changes from your original:
// - Added `moreItems` for the new pages (About, Leadership, Collaborations,
//   Partnership, Events, Resources, Collaboration Hub, Consultancy Services)
// - Added a "More" dropdown on desktop so the main bar doesn't get crowded
// - Mobile menu lists everything flat, under a "More" divider
// - Everything else (auth buttons, admin/dashboard links, logout) is unchanged

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: string; // ✅ Added string tracking property
}

export default function Navbar({ isLoggedIn = false, userRole = "" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Proposal", href: "/proposal-center" },
    { label: "Funding", href: "/funding-opportunities" },
    { label: "Academy", href: "/training-academy" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
    { label: "SDGs", href: "/sdgs" },
  ];

  const moreItems = [
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/leadership" },
    { label: "Collaborations", href: "/collaborations" },
    { label: "Partnership", href: "/partnership" },
    { label: "Events", href: "/events" },
    { label: "Resources Library", href: "/resources" },
    { label: "Collaboration Hub", href: "/collaboration-hub" },
    { label: "Consultancy Services", href: "/consultancy-services" },
  ];

  // Close the "More" dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    }).catch((error) => {
      console.log(error);
    });
  
    setOpen(false);
    router.refresh();
    router.push("/");
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          RGIS
        </Link>

        {/* Desktop Nav Links */}
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

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium transition hover:text-blue-600"
            >
              More
              <ChevronDown
                size={16}
                className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-white py-2 shadow-lg">
                {moreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 🛡️ Conditional Role Links (Desktop) */}
          {isLoggedIn && userRole === "Admin" && (
            <Link href="/admin/proposals" className="text-sm font-semibold text-purple-600 hover:text-purple-700">
              Admin Panel
            </Link>
          )}

          {isLoggedIn && userRole !== "Admin" && (
            <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Dashboard
            </Link>
          )}
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
                <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              
              <Link href="/signup">
                <button className="px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                  Sign Up
                </button>
              </Link>

              <Link href="/membership">
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Join as Member
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
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

            {/* More pages — flat on mobile, under a divider */}
            <div className="pt-4">
              <p className="pb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                More
              </p>
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* 🛡️ Conditional Role Links (Mobile) */}
            {isLoggedIn && userRole === "Admin" && (
              <Link href="/admin/proposals" onClick={() => setOpen(false)} className="py-4 text-sm font-semibold text-purple-600">
                Admin Panel
              </Link>
            )}

            {isLoggedIn && userRole !== "Admin" && (
              <Link href="/proposal-center" onClick={() => setOpen(false)} className="py-4 text-sm font-semibold text-blue-600">
                User Dashboard
              </Link>
            )}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition">
                      Login
                    </button>
                  </Link>

                  <Link href="/signup" onClick={() => setOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm font-medium border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                      Sign Up
                    </button>
                  </Link>

                  <Link href="/membership" onClick={() => setOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                      Join as Member
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