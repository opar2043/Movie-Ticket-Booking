import React from "react";
import Link from "next/link";
import { Edit, Film, Calendar, Plus, ArrowUpRight } from "lucide-react";
import { moviesRoute } from "@/src/app/components/service/movie";
import DeleteMovieButton from "@/src/app/components/Layout/DeleteMovieButton";
import { MOVIE } from "@/src/app/components/types/movies.type";

export default async function AllMoviesPage() {
  const responseData = await moviesRoute.getMovies();
  const movies = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div>
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
            Catalogue · {movies.length} titles
          </p>
          <h1
            className="text-white font-light leading-[1] tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Manage your{" "}
            <span className="italic font-serif text-white/80">film library.</span>
          </h1>
          <p className="text-white/55 mt-3 max-w-xl text-sm">
            Edit metadata, replace posters, swap trailers or remove titles from
            the public-facing catalogue.
          </p>
        </div>

        <Link
          href="/dashboard/admin/movies"
          className="group inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_10px_24px_-8px_rgba(255,255,255,0.25)] self-start lg:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add new film
          <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#23262B] border border-white/8 overflow-hidden luxury-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#121315] border-b border-white/8">
              <tr>
                {["Title", "Director", "Year", "Pricing", "Actions"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-white/45 ${
                        i === 4 ? "text-right" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {movies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-white/55">
                      <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Film className="w-5 h-5" />
                      </div>
                      <p className="text-base font-medium text-white">
                        No films yet
                      </p>
                      <p className="text-xs">
                        Add the first title to get started.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                movies.map((movie: any) => (
                  <tr
                    key={movie.id}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {movie.posterUrl ? (
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-11 h-11 rounded-xl object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                            <Film className="w-5 h-5 text-white/55" />
                          </div>
                        )}
                        <span className="font-medium text-white">
                          {movie.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {movie.director || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-white/45" />
                        {movie.releaseYear || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${
                          movie.pricing === "PREMIUM"
                            ? "bg-white text-[#121315] font-medium"
                            : "bg-white/[0.06] text-white/80 border border-white/10"
                        }`}
                      >
                        {movie.pricing || "FREE"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/all-movies/${movie.id}`}
                          className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
                          title="Edit film"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteMovieButton
                          id={movie.id}
                          movieTitle={movie.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
