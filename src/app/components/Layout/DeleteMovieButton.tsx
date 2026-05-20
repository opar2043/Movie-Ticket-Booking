"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { moviesRoute } from "@/src/app/components/service/movie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface DeleteMovieButtonProps {
  id: string;
  movieTitle: string;
}

export default function DeleteMovieButton({
  id,
  movieTitle,
}: DeleteMovieButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete this film?",
      text: `“${movieTitle}” will be removed permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FEFEFE",
      cancelButtonColor: "#23262B",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#23262B",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    setIsDeleting(true);
    const toastId = toast.loading(`Deleting “${movieTitle}”…`);

    try {
      await moviesRoute.deleteMovies(id);
      toast.success(`“${movieTitle}” removed`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message || `Failed to delete “${movieTitle}”`,
        { id: toastId },
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all disabled:opacity-50"
      title="Delete film"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
