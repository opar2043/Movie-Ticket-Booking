"use client";

import React, { useState } from "react";
import {
  Trash2,
  Loader2,
  ShieldUser,
  User as UserIcon,
} from "lucide-react";
import { userRoute } from "@/src/app/components/service/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserRole, normalizeRole } from "@/src/app/(auth)/useAuth";
import { cn } from "@/src/app/components/lib/utils";

interface UserActionsProps {
  userId: string;
  userName: string;
  currentRole: string | UserRole;
}

export default function UserActions({
  userId,
  userName,
  currentRole: rawRole,
}: UserActionsProps) {
  const currentRole = normalizeRole(rawRole);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete user “${userName}”?`)) return;

    setIsDeleting(true);
    const toastId = toast.loading(`Deleting “${userName}”…`);
    try {
      await userRoute.deleteUser(userId);
      toast.success(`User “${userName}” deleted`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Delete user error:", error);
      toast.error(
        error.response?.data?.message || `Failed to delete “${userName}”`,
        { id: toastId },
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRoleToggle = async () => {
    const newRole =
      currentRole === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    setIsChangingRole(true);
    const toastId = toast.loading(`Changing role to ${newRole}…`);
    try {
      await userRoute.updateUser(userId, { role: newRole });
      toast.success(`Role changed to ${newRole}`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Role change error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update role",
        { id: toastId },
      );
    } finally {
      setIsChangingRole(false);
    }
  };

  const isAdmin = currentRole === UserRole.ADMIN;

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={handleRoleToggle}
        disabled={isChangingRole}
        className={cn(
          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all disabled:opacity-50",
          isAdmin
            ? "bg-white text-[#121315]"
            : "border border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/[0.08]",
        )}
        title={`Switch to ${isAdmin ? "USER" : "ADMIN"}`}
      >
        {isChangingRole ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isAdmin ? (
          <ShieldUser className="w-3.5 h-3.5" />
        ) : (
          <UserIcon className="w-3.5 h-3.5" />
        )}
        {isAdmin ? "Admin" : "User"}
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all disabled:opacity-50"
        title="Delete user"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
