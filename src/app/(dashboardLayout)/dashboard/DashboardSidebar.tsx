"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Film,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
  ShieldCheck,
  MessageSquareText,
  Heart,
} from "lucide-react";
import { signOut, UserRole } from "@/src/app/(auth)/useAuth";
import { toast } from "sonner";

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

  const allLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Moderation",
      href: "/dashboard/admin/moderation",
      icon: ShieldCheck,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Add Movie",
      href: "/dashboard/admin/movies",
      icon: PlusCircle,
      roles: [UserRole.ADMIN],
    },
    {
      name: "All Movies",
      href: "/dashboard/admin/all-movies",
      icon: Film,
      roles: [UserRole.ADMIN],
    },
    {
      name: "Users",
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
      name: "Favorites",
      href: "/dashboard/user/favorites",
      icon: Heart,
      roles: [UserRole.USER, UserRole.ADMIN],
    },
  ];

  const sidebarLinks = allLinks.filter((link) =>
    link.roles.includes(user?.role ?? UserRole.USER)
  );

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Error logging out", { id: toastId });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 shrink-0 bg-black border-r border-[#2B2B2B] flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-[#2B2B2B]">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-[#E50914] transition-colors"
            >
              <Film className="w-6 h-6 text-[#E50914]" />
              CineVerse {isAdmin ? "Admin" : "User"}
            </Link>
          </div>

          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all font-medium text-sm ${
                    isActive
                      ? "bg-[#E50914]/20 text-[#E50914]"
                      : "text-gray-400 hover:bg-[#141414] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-[#E50914]" : "text-gray-400"
                    }`}
                  />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[#2B2B2B]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white truncate max-w-[120px]">
                {user?.name || "Viewer"}
              </span>
              <span className="text-xs text-gray-400 truncate max-w-[120px]">
                {user?.email || "user@example.com"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#2B2B2B] rounded-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mt-4">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-[#E50914] hover:bg-red-700 rounded-sm transition-colors"
            >
              Back to Home
            </Link>


          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#141414] relative">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[#2B2B2B] bg-[#000000] md:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-white"
          >
            <Film className="w-5 h-5 text-[#E50914]" />
            CineVerse
          </Link>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-[#E50914] transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}