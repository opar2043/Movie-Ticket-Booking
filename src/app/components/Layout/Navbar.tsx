"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, Menu, X, ChevronDown, Film, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/src/app/components/lib/utils";
import { useAuth, signOut } from "@/src/app/(auth)/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    href: "/movies",
  },
  {
    label: "About",
    href: "/about",
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout", { id: toastId });
    }
  };

  // Safe helper values
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const avatarInitial = (user?.name?.[0] ?? user?.email?.[0] ?? "U").toUpperCase();
  const firstName = displayName.split(" ")[0];

  return (
    <>
      <div className="h-[72px]" />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-slate-950 border-b border-slate-800",
          isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.6)]" : "",
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 rounded-sm bg-[#E50914] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <Film className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <span className="text-white font-bold text-xl ">Movies OK</span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150",
                      "text-slate-300 hover:text-white hover:bg-slate-800",
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
                          activeDropdown === link.label ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-100 border-b border-slate-800 last:border-0"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Search"
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150"
              >
                <Search className="w-5 h-5" />
              </button>

              {isPending ? (
                <div className="w-9 h-9 rounded-full bg-slate-800 animate-pulse mx-2" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-sm bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 group"
                  >
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors max-w-[80px] truncate">
                      {firstName}
                    </span>
                    <div className="w-7 h-7 rounded-sm bg-[#E50914] flex items-center justify-center text-white text-[10px] font-bold">
                      {avatarInitial}
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-[#141414] rounded-sm shadow-2xl border border-[#2B2B2B] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 text-white">
                      <div className="px-4 py-3 border-b border-[#2B2B2B] bg-[#000000]">
                        <p className="text-sm font-bold text-white truncate">{displayName}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user?.email ?? ""}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#2B2B2B] hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-[#2B2B2B] hover:text-red-400 transition-colors border-t border-[#2B2B2B] mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-[#E50914] hover:bg-red-700 text-white px-5 py-2 rounded-sm text-sm font-bold shadow-lg shadow-[#E50914]/20 transition-all transform active:scale-95"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-150"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-4 pb-4">
            <ul className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <div
                    className="flex items-center justify-between px-3 py-2.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors duration-150"
                    onClick={() =>
                      link.children
                        ? setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label,
                          )
                        : setMobileOpen(false)
                    }
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium flex-1"
                      onClick={() => !link.children && setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-slate-400 transition-transform duration-200",
                          mobileExpanded === link.label ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </div>

                  {link.children && mobileExpanded === link.label && (
                    <ul className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-[#E50914] pl-3">
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-2 py-2 text-sm text-slate-400 hover:text-white transition-colors duration-100"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {user && (
                <li className="mt-4 pt-4 border-t border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}