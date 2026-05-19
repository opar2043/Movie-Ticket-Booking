"use client";

import React, { useState } from "react";
import { Trash2, UserCog, Loader2, ShieldUser, User as UserIcon } from "lucide-react";
import { userRoute } from "@/src/app/components/service/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserRole, normalizeRole } from "@/src/app/(auth)/useAuth";

interface UserActionsProps {
  userId: string;
  userName: string;
  currentRole: string | UserRole;
}

export default function UserActions({ userId, userName, currentRole: rawRole }: UserActionsProps) {
  const currentRole = normalizeRole(rawRole);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingRole, setIsChangingRole] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;

    setIsDeleting(true);
    const toastId = toast.loading(`Deleting "${userName}"...`);

    try {
      await userRoute.deleteUser(userId);
      toast.success(`User "${userName}" deleted successfully`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Delete user error:", error);
      toast.error(error.response?.data?.message || `Failed to delete user "${userName}"`, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRoleToggle = async () => {
    const newRole = currentRole === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN;
    
    setIsChangingRole(true);
    const toastId = toast.loading(`Changing role for "${userName}" to ${newRole}...`);

    try {
      await userRoute.updateUser(userId, { role: newRole });
      toast.success(`Role changed to ${newRole} for "${userName}"`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Role change error:", error);
      toast.error(error.response?.data?.message || "Failed to update role", { id: toastId });
    } finally {
      setIsChangingRole(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Role Toggle Button */}
      <button
        onClick={handleRoleToggle}
        disabled={isChangingRole}
        className={`p-2 rounded-md transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
          currentRole === UserRole.ADMIN 
            ? "text-purple-600 bg-purple-50 hover:bg-purple-100" 
            : "text-blue-600 bg-blue-50 hover:bg-blue-100"
        } disabled:opacity-50`}
        title={`Change role to ${currentRole === UserRole.ADMIN ? "USER" : "ADMIN"}`}
      >
        {isChangingRole ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : currentRole === UserRole.ADMIN ? (
          <>
            <ShieldUser className="w-4 h-4" />
            Admin
          </>
        ) : (
          <>
            <UserIcon className="w-4 h-4" />
            User
          </>
        )}
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
        title="Delete User"
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
