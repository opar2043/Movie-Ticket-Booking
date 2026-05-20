"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth, redirectPathForRole } from "@/src/app/(auth)/useAuth";

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
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-white/55">
      <Loader2 className="w-5 h-5 animate-spin text-white" />
      <p className="text-[10px] tracking-[0.4em] uppercase">
        Redirecting to your studio
      </p>
    </div>
  );
}
