import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { moviesRoute } from "../service/movie";
import { MOVIE } from "../types/movies.type";
import MovieCard from "./MovieCard";

export default async function HomeMovies() {
  const responseData = await moviesRoute.getMovies();
  const movies = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-5">
              The Selection · 01
            </p>
            <h2
              className="text-white font-light leading-[0.98] tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Films we're{" "}
              <span className="italic font-serif text-white/80">obsessing</span>{" "}
              over this week.
            </h2>
            <p className="text-white/60 mt-5 text-[15px] leading-relaxed max-w-lg">
              A handpicked editorial of cinema worth your evening — from
              blockbusters to retrospective gems, curated by people who actually
              go to the movies.
            </p>
          </div>

          <Link
            href="/movies"
            className="group inline-flex items-center gap-2.5 self-start pl-5 pr-2 py-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white text-sm font-medium transition-colors"
          >
            View entire catalogue
            <span className="w-9 h-9 rounded-full bg-white text-[#121315] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Grid */}
        {movies && movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {movies.slice(0, 4).map((m: MOVIE) => (
              <MovieCard key={m.id} m={m} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl bg-[#23262B] border border-white/8">
            <p className="text-white/60">
              Our editorial is loading the next selection — check back soon.
            </p>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-14 flex items-center gap-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">
            New stories every Friday
          </p>
          <div className="flex-1 h-px bg-white/8" />
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">
            04 of {movies?.length || 0}
          </p>
        </div>
      </div>
    </section>
  );
}
