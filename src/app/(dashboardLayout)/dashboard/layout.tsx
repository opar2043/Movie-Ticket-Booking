"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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
      <div className="min-h-screen bg-[#000000] text-white flex justify-center items-center">
        Checking authorization...
      </div>
    );
  }

  return <DashboardSidebar user={user}>{children}</DashboardSidebar>;
}
