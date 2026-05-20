"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  User,
  ShieldCheck,
  MessageSquareText,
  Heart,
  Film,
  Menu,
  X,
  ArrowUpRight,
  Ticket,
} from "lucide-react";
import { signOut, UserRole } from "@/src/app/(auth)/useAuth";
import { toast } from "sonner";
import { cn } from "@/src/app/components/lib/utils";

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: UserRole;
  };
  children: React.ReactNode;
}

export default function DashboardSidebar({
  user,
  children,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user?.role === UserRole.ADMIN;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
    // <Navigator route="/dashboard/admin/movies" Icon={StockIcon} label="Manage Movies" />
    // <Navigator route="/dashboard/admin/tickets" Icon={OrderIcon} label="Tickets" />
    // <Navigator route="/dashboard/admin/reviews" Icon={ReviewIcon} label="Manage Reviews" />
    // <Navigator route="/dashboard/admin/users" Icon={AllOrdersIcon} label="All Users" />
    // <Navigator route="/dashboard/admin/profile" Icon={ProfileIcon} label="Profile" />
  const allLinks = [
    {
      name: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      roles: [UserRole.ADMIN],
    },
        {
      name: "Add Film",
      href: "/dashboard/admin/movies",
      icon: PlusCircle,
      roles: [UserRole.ADMIN],
    },
    
    {
      name: "All Films",
      href: "/dashboard/admin/all-movies",
      icon: Film,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Moderation",
      href: "/dashboard/admin/moderation",
      icon: ShieldCheck,
      roles: [UserRole.ADMIN],
    },

    {
      name: "Tickets",
      href: "/dashboard/admin/tickets",
      icon: Ticket,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Members",
      href: "/dashboard/admin/users",
      icon: User,
      roles: [UserRole.ADMIN],
    },
    {
      name: "My Reviews",
      href: "/dashboard/user/reviews",
      icon: MessageSquareText,
      roles: [UserRole.USER, UserRole.ADMIN],
    },
    {
      name: "Favourites",
      href: "/dashboard/user/favorites",
      icon: Heart,
      roles: [UserRole.USER, UserRole.ADMIN],
    },
  ];

  const sidebarLinks = allLinks.filter((link) =>
    link.roles.includes(user?.role ?? UserRole.USER),
  );

  const handleLogout = async () => {
    const toastId = toast.loading("Signing you out…");
    try {
      await signOut();
      toast.success("Signed out", { id: toastId });
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Error signing out", { id: toastId });
    }
  };

  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? "U").toUpperCase();

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="w-11 h-11 rounded-xl bg-white text-[#121315] flex items-center justify-center font-bold tracking-tighter shadow-[0_10px_30px_-8px_rgba(255,255,255,0.25)]">
            M
          </div>
          <div className="leading-tight">
            <span className="block text-white font-medium tracking-tight">
              Movies <span className="text-white/70 font-light">OK</span>
            </span>
            <span className="block text-[10px] text-white/45 tracking-[0.3em] uppercase">
              {isAdmin ? "Admin Studio" : "Member Suite"}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1 overflow-y-auto">
        <p className="px-4 mb-3 text-[10px] tracking-[0.4em] uppercase text-white/35">
          Workspace
        </p>
        <div className="space-y-1">
          {sidebarLinks.map((link) => {
            const active =
              link.href === "/dashboard/admin"
                ? pathname === link.href
                : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200",
                  active
                    ? "bg-white text-[#121315] font-medium shadow-[0_10px_24px_-8px_rgba(255,255,255,0.2)]"
                    : "text-white/65 hover:text-white hover:bg-white/[0.04]",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    active ? "text-[#121315]" : "text-white/55",
                  )}
                />
                <span className="flex-1">{link.name}</span>
                {active && (
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#121315]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User card */}
      <div className="p-4 mt-2">
        <div className="rounded-xl bg-[#121315] border border-white/8 p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#121315] flex items-center justify-center font-bold text-sm">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "Viewer"}
              </p>
              <p className="text-[11px] text-white/45 truncate">
                {user?.email || "user@moviesok.com"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white text-[#121315] text-xs font-medium hover:scale-[1.02] transition-transform"
            >
              Home
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/[0.08] text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>

        <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase mt-5 text-center">
          Atelier · v1.0
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-[#121315]">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[280px] shrink-0 sticky top-0 h-screen">
        <div className="m-4 h-[calc(100%-2rem)] rounded-[2rem] bg-[#23262B] border border-white/8 luxury-shadow overflow-hidden">
          {SidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#121315]/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-50 md:hidden p-4"
            >
              <div className="h-full rounded-[2rem] bg-[#23262B] border border-white/8 luxury-shadow overflow-hidden relative">
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.1] transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                {SidebarContent}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-30 px-4 pt-4">
          <div className="glass-strong rounded-full px-4 py-2.5 flex items-center justify-between">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/85 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#121315] flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="tracking-tight">
                Movies <span className="text-white/70">OK</span>
              </span>
            </Link>

            <button
              onClick={handleLogout}
              aria-label="Sign out"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/85 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <div className="mx-auto max-w-[1200px] w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
