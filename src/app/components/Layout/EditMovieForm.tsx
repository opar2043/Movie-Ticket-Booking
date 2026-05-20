"use client";

import { moviesRoute } from "@/src/app/components/service/movie";
import {
  Clapperboard,
  Calendar,
  Users,
  ListVideo,
  Link as LinkIcon,
  DollarSign,
  Loader2,
  Type,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { MOVIE } from "../types/movies.type";
import CloudinaryUpload from "../CloudinaryUpload";

export default function EditMovieForm({ id }: { id: string }) {
  const [movieData, setMovieData] = useState<MOVIE | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await moviesRoute.getSingleMovies(id);
        const data = response.data || response;
        setMovieData(data);
        if (data.posterUrl) setPosterUrl(data.posterUrl);
      } catch (error: any) {
        console.error("Failed to fetch movie:", error);
        toast.error("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchMovie();
  }, [id]);

  async function editMovieAction(e: any) {
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
    const trailerUrl = frm.trailerUrl.value;

    const payload = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
    } as MOVIE;

    setSubmitting(true);
    try {
      await moviesRoute.updateMovies(id, payload);
      toast.success("Film updated");
    } catch (error: any) {
      console.error("Update movie error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update film",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-white/55">
        <Loader2 className="w-6 h-6 animate-spin text-white" />
        <p className="text-[10px] tracking-[0.4em] uppercase">
          Loading film details
        </p>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="rounded-3xl bg-[#23262B] border border-white/8 p-12 text-center">
        <p className="text-white font-medium">Film not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3 flex items-center gap-2">
          <Clapperboard className="w-3.5 h-3.5" />
          Editing
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
        >
          Update{" "}
          <span className="italic font-serif text-white/80">
            “{movieData.title}.”
          </span>
        </h1>
      </div>

      <form
        onSubmit={editMovieAction}
        className="rounded-[2rem] bg-[#23262B] border border-white/8 p-6 sm:p-10 luxury-shadow text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field icon={<Type className="w-4 h-4" />} label="Title" full>
            <input
              name="title"
              required
              defaultValue={movieData.title}
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
              defaultValue={movieData.synopsis || ""}
              className="w-full px-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all min-h-[120px] resize-none"
            />
          </div>

          <Field icon={<Calendar className="w-4 h-4" />} label="Release year">
            <input
              name="releaseYear"
              type="number"
              defaultValue={movieData.releaseYear}
              className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
            />
          </Field>

          <Field icon={<DollarSign className="w-4 h-4" />} label="Pricing">
            <select
              name="pricing"
              defaultValue={movieData.pricing}
              className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
            >
              <option value="FREE">Free tier</option>
              <option value="PREMIUM">Premium / paid</option>
            </select>
          </Field>

          <Field icon={<Users className="w-4 h-4" />} label="Director">
            <input
              name="director"
              defaultValue={movieData.director}
              className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
            />
          </Field>

          <Field icon={<Users className="w-4 h-4" />} label="Cast">
            <input
              name="cast"
              defaultValue={movieData.cast || ""}
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
              defaultValue={movieData.streamingPlatforms?.join(", ")}
              className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
            />
          </Field>

          <div className="md:col-span-2">
            <CloudinaryUpload
              label="Movie poster"
              onUploadSuccess={(url) => setPosterUrl(url)}
            />
            {posterUrl && (
              <div className="mt-3 flex items-center gap-3">
                <div className="w-20 h-28 rounded-xl border border-white/10 overflow-hidden shrink-0">
                  <img
                    src={posterUrl}
                    alt="Poster preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] text-white/40 font-mono truncate">
                  {posterUrl}
                </p>
              </div>
            )}
          </div>

          <Field
            icon={<LinkIcon className="w-4 h-4" />}
            label="Trailer URL"
            full
          >
            <input
              name="trailerUrl"
              defaultValue={movieData.trailerUrl || ""}
              className="w-full pl-11 pr-4 py-3 bg-[#121315] border border-white/8 rounded-2xl text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-white/30 transition-all"
            />
          </Field>
        </div>

        <div className="pt-7 mt-7 border-t border-white/8 flex flex-wrap items-center justify-end gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-transform shadow-[0_10px_24px_-8px_rgba(255,255,255,0.25)]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                Save changes
                <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
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
