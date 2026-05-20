import Link from "next/link";
import MovieCard from "@/src/app/components/Layout/MovieCard";
import { moviesRoute } from "../../components/service/movie";
import { MOVIE } from "../../components/types/movies.type";
import { Film, Search, Sparkles, X } from "lucide-react";

type SearchParams = Promise<{
  q?: string;
  director?: string;
  year?: string;
}>;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const directorFilter = (sp.director ?? "").trim();
  const yearFilter = (sp.year ?? "").trim();

  const responseData = await moviesRoute.getMovies();
  const allMovies: MOVIE[] = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  // Unique sorted lists for the filter selects
  const directors = Array.from(
    new Set(
      allMovies
        .map((m) => (m.director || "").trim())
        .filter((d) => d.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const years = Array.from(
    new Set(allMovies.map((m) => m.releaseYear).filter(Boolean)),
  ).sort((a, b) => b - a);

  // Apply filters
  const movies = allMovies.filter((m) => {
    if (q) {
      const haystack = `${m.title ?? ""} ${m.director ?? ""} ${m.synopsis ?? ""}`.toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    if (directorFilter && (m.director || "").trim() !== directorFilter) {
      return false;
    }
    if (yearFilter && String(m.releaseYear) !== yearFilter) {
      return false;
    }
    return true;
  });

  const hasFilter = Boolean(q || directorFilter || yearFilter);

  return (
    <main className="bg-[#121315]">
      {/* HERO */}
      <section className="relative pt-2 pb-12">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative h-[58vh] min-h-[460px] rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
            <img
              src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#121315]/30 via-[#121315]/60 to-[#121315]" />

            <div className="relative h-full flex flex-col justify-end p-8 sm:p-14 max-w-5xl">
              <span className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-6">
                <Sparkles className="w-3 h-3" />
                The Catalogue · 07
              </span>
              <h1
                className="text-white font-light leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
              >
                Every film, one{" "}
                <span className="italic font-serif text-white/80">
                  beautiful place.
                </span>
              </h1>
              <p className="text-white/70 mt-5 max-w-2xl text-lg leading-relaxed">
                {allMovies.length}{" "}
                <span className="text-white">handpicked titles</span>, organised
                by mood, era, and intent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="pb-10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/45">
              {hasFilter ? "Filtered selection" : "Showing all titles"}
            </p>
            <p className="text-white text-base mt-1">
              <span className="font-medium">{movies.length}</span>
              <span className="text-white/60">
                {" "}
                of {allMovies.length}{" "}
                {allMovies.length === 1 ? "film" : "films"}
              </span>
              {q && (
                <span className="text-white/60">
                  {" "}
                  · search “<span className="text-white">{q}</span>”
                </span>
              )}
            </p>
          </div>

          {/* Right-side filters: Director + Year */}
          <form
            action="/movies"
            method="get"
            className="flex flex-wrap items-center gap-2 ml-auto"
          >
            {q && <input type="hidden" name="q" value={q} />}

            <div className="relative">
              <label className="sr-only" htmlFor="filter-director">
                Director
              </label>
              <select
                id="filter-director"
                name="director"
                defaultValue={directorFilter}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/85 text-xs font-medium tracking-wide hover:border-white/20 focus:outline-none focus:border-white/30 transition-all cursor-pointer"
              >
                <option value="">All directors</option>
                {directors.map((d) => (
                  <option key={d} value={d} className="bg-[#23262B] text-white">
                    {d}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45 text-[10px]">
                ▾
              </span>
            </div>

            <div className="relative">
              <label className="sr-only" htmlFor="filter-year">
                Year
              </label>
              <select
                id="filter-year"
                name="year"
                defaultValue={yearFilter}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/85 text-xs font-medium tracking-wide hover:border-white/20 focus:outline-none focus:border-white/30 transition-all cursor-pointer"
              >
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#23262B] text-white">
                    {y}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45 text-[10px]">
                ▾
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#121315] text-xs font-medium hover:scale-[1.02] transition-transform"
            >
              <Search className="w-3.5 h-3.5" />
              Apply
            </button>

            {hasFilter && (
              <Link
                href="/movies"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/75 hover:text-white hover:bg-white/[0.08] text-xs font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </Link>
            )}
          </form>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          {movies.length === 0 ? (
            <div className="text-center py-24 rounded-3xl bg-[#23262B] border border-white/8">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
                <Film className="w-7 h-7 text-white" />
              </div>
              <p className="text-white font-medium">
                {hasFilter ? "No films match your filters." : "No films yet."}
              </p>
              <p className="text-white/55 text-sm mt-1">
                {hasFilter
                  ? "Try clearing a filter or searching for a different title."
                  : "The next selection is being curated — check back soon."}
              </p>
              {hasFilter && (
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-white text-[#121315] text-xs font-medium hover:scale-[1.02] transition-transform"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear all filters
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {movies.map((m: MOVIE) => (
                <MovieCard key={m.id} m={m} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
