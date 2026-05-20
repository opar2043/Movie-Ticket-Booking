"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Ticket,
  Heart,
} from "lucide-react";
import { cn } from "@/src/app/components/lib/utils";
import { useAuth, signOut } from "@/src/app/(auth)/useAuth";
import { toast } from "sonner";

type NavLink = { label: string; href: string };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setIsUserMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const toastId = toast.loading("Signing you out…");
    try {
      await signOut();
      toast.success("Signed out", { id: toastId });
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to sign out", { id: toastId });
    }
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = (data.get("q") as string | null)?.trim();
    if (q) router.push(`/movies?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
  };

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "Guest";
  const avatarInitial = (
    user?.name?.[0] ??
    user?.email?.[0] ??
    "G"
  ).toUpperCase();
  const firstName = displayName.split(" ")[0];
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="h-[88px]" />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-3"
            : "py-5",
        )}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <motion.nav
            initial={false}
            animate={{
              backgroundColor: isScrolled
                ? "rgba(18,19,21,0.72)"
                : "rgba(18,19,21,0)",
              borderColor: isScrolled
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "relative flex items-center justify-between px-5 sm:px-7 py-3 rounded-full border",
              isScrolled
                ? "backdrop-blur-xl"
                : "backdrop-blur-md bg-white/[0.02]",
            )}
            style={{ borderWidth: 1 }}
          >
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#121315] font-bold shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300">
                <span className="text-base tracking-tighter">M</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#121315] border-2 border-white" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-medium text-base tracking-tight">
                  Movies <span className="font-light text-white/70">OK</span>
                </span>
                <span className="block text-[10px] text-white/50 tracking-[0.3em] uppercase">
                  Cinema Atelier
                </span>
              </div>
            </Link>

            {/* Right cluster: nav links + actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Desktop links — right aligned */}
              <ul className="hidden lg:flex items-center gap-1 mr-2 pr-2 border-r border-white/10">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative px-4 py-2 rounded-full text-sm transition-colors duration-200",
                          active
                            ? "text-white"
                            : "text-white/60 hover:text-white",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        )}
                        <span className="relative font-medium">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <button
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>

              {isPending ? (
                <div className="w-10 h-10 rounded-full bg-white/[0.06] animate-pulse" />
              ) : user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/10"
                  >
                    <span className="text-xs text-white/80 max-w-[100px] truncate hidden sm:inline">
                      {firstName}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white text-[#121315] flex items-center justify-center text-[11px] font-bold">
                      {avatarInitial}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-3 w-64 glass-strong rounded-3xl overflow-hidden text-white"
                      >
                        <div className="px-5 py-4 border-b border-white/8">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-[#121315] flex items-center justify-center text-sm font-bold">
                              {avatarInitial}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {displayName}
                              </p>
                              <p className="text-[11px] text-white/50 truncate">
                                {user?.email ?? ""}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          {[
                            {
                              icon: LayoutDashboard,
                              label: "Dashboard",
                              href: "/dashboard",
                            },
                            {
                              icon: Ticket,
                              label: "My Tickets",
                              href: "/dashboard",
                            },
                            {
                              icon: Heart,
                              label: "Favourites",
                              href: "/dashboard",
                            },
                          ].map(({ icon: Icon, label, href }) => (
                            <Link
                              key={label}
                              href={href}
                              className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white transition-colors"
                            >
                              <Icon className="w-4 h-4 text-white/60" />
                              {label}
                            </Link>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-white/60 hover:bg-white/[0.06] hover:text-white transition-colors border-t border-white/8"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-full bg-white text-[#121315] text-sm font-medium shadow-[0_8px_20px_-4px_rgba(255,255,255,0.18)] hover:scale-[1.02] transition-transform"
                  >
                    Register
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="lg:hidden p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.nav>

          {/* Search drawer */}
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-3 glass-strong rounded-full px-6 py-3.5 flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-white/50" />
                <input
                  name="q"
                  type="text"
                  autoFocus
                  placeholder="Search films, directors, genres…"
                  className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-white/40"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.25em] font-medium"
                >
                  Esc
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-3 mx-5 sm:mx-8 max-w-[1400px] sm:mx-auto glass-strong rounded-3xl px-5 py-5"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-white/70 hover:text-white hover:bg-white/[0.04]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {!user && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/8">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-3 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:bg-white/[0.04]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center bg-white text-[#121315] px-4 py-3 rounded-full text-sm font-medium"
                  >
                    Join Studio
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
