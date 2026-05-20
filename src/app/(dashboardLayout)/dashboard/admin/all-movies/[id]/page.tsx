import EditMovieForm from "@/src/app/components/Layout/EditMovieForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="text-white">
      <Link
        href="/dashboard/admin/all-movies"
        className="inline-flex items-center gap-1.5 mb-6 text-xs tracking-[0.25em] uppercase text-white/55 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to catalogue
      </Link>
      <EditMovieForm id={id} />
    </div>
  );
}
