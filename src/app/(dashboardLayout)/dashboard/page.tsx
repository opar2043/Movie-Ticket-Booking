"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useAuth,
  redirectPathForRole,
} from "@/src/app/(auth)/useAuth";

export default function DashboardIndexPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    router.replace(redirectPathForRole(user.role));
  }, [user, isPending, router]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center text-gray-400">
      Redirecting to your dashboard...
    </div>
  );
}
