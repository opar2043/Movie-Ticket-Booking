"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/app/(auth)/useAuth";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <div className="min-h-screen bg-[#121315] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white text-[#121315] flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/55">
          Checking authorization
        </p>
      </div>
    );
  }

  return <DashboardSidebar user={user}>{children}</DashboardSidebar>;
}
