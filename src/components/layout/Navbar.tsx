    "use client";

    import Link from "next/link";
    import { useState } from "react";
    import { Menu, X } from "lucide-react";
    import { useRouter } from "next/navigation";

    interface NavbarProps {
      isLoggedIn?: boolean;
      userRole?: string; // ✅ Added string tracking property
    }

    export default function Navbar({ isLoggedIn = false, userRole = "" }: NavbarProps) {
      const [open, setOpen] = useState(false);
      const router = useRouter();

      const navItems = [
        { label: "Home", href: "/" },
        { label: "Proposal", href: "/proposal-center" },
        { label: "Funding", href: "/funding-opportunities" },
        { label: "Academy", href: "/training-academy" },
        { label: "Membership", href: "/membership" },
        { label: "Contact", href: "/contact" },
      ];

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