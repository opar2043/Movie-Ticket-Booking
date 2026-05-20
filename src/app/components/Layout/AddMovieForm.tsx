"use client";

import { moviesRoute } from "@/src/app/components/service/movie";
import {
  Calendar,
  Users,
  ListVideo,
  Link as LinkIcon,
  DollarSign,
  Type,
  FileText,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import CloudinaryUpload from "../CloudinaryUpload";

export default function AddMovieForm() {
  const [posterUrl, setPosterUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function createMovieAction(e: any) {
    e.preventDefault();
    const frm = e.target;
    const title = frm.title.value;
    const synopsis = frm.synopsis.value;
    const releaseYear = parseInt(frm.releaseYear.value);
    const director = frm.director.value;
    const cast = frm.cast.value;
    const streamingPlatforms = frm.streamingPlatforms.value
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);
    const pricing = frm.pricing.value;

    if (!posterUrl) {
      toast.error("Please upload a movie poster");
      return;
    }

    const trailerUrl = frm.trailerUrl.value;
    const movie = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
    };

    setSubmitting(true);
    try {
      const response = await moviesRoute.createMovies(movie as any);
      if (response.success) {
        toast.success("Film added to the catalogue");
        frm.reset();
        setPosterUrl("");
      } else {
        toast.error(response.message || "Failed to add film");
      }
    } catch (error: any) {
      console.error("Add movie error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add film",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={createMovieAction}
      className="rounded-[2rem] bg-[#23262B] border border-white/8 p-6 sm:p-10 luxury-shadow text-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field icon={<Type className="w-4 h-4" />} label="Title" full>
          <input
            name="title"
            required
            placeholder="Inception"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-base placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>

        <div className="md:col-span-2">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-2 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Synopsis
          </p>
          <textarea
            name="synopsis"
            placeholder="A brief, evocative description of the film…"
            className="w-full px-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all min-h-[120px] resize-none"
          />
        </div>

        <Field icon={<Calendar className="w-4 h-4" />} label="Release year">
          <input
            name="releaseYear"
            type="number"
            placeholder="2010"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>

        <Field icon={<DollarSign className="w-4 h-4" />} label="Pricing">
          <select
            name="pricing"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
          >
            <option value="FREE">Free tier</option>
            <option value="PREMIUM">Premium / paid</option>
          </select>
        </Field>

        <Field icon={<Users className="w-4 h-4" />} label="Director">
          <input
            name="director"
            placeholder="Christopher Nolan"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>

        <Field icon={<Users className="w-4 h-4" />} label="Cast">
          <input
            name="cast"
            placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt…"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>

        <Field
          icon={<ListVideo className="w-4 h-4" />}
          label="Streaming platforms"
          full
        >
          <input
            name="streamingPlatforms"
            required
            placeholder="Netflix, Hulu, Amazon Prime (comma separated)"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>

        <div className="md:col-span-2">
          <CloudinaryUpload
            label="Movie poster"
            onUploadSuccess={(url) => setPosterUrl(url)}
          />
          {posterUrl && (
            <p className="text-[10px] text-white/40 font-mono mt-2 truncate">
              Uploaded: {posterUrl}
            </p>
          )}
        </div>

        <Field
          icon={<LinkIcon className="w-4 h-4" />}
          label="Trailer URL"
          full
        >
          <input
            name="trailerUrl"
            placeholder="https://youtube.com/watch?v=…"
            className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
          />
        </Field>
      </div>

      <div className="pt-7 mt-7 border-t border-white/8 flex flex-wrap items-center justify-end gap-3">
        <button
          type="reset"
          onClick={() => setPosterUrl("")}
          className="px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/[0.08] text-sm font-medium transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-transform shadow-[0_10px_24px_-8px_rgba(255,255,255,0.25)]"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding…
            </>
          ) : (
            <>
              Publish film
              <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  icon,
  label,
  full = false,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <p className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </p>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/45">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
