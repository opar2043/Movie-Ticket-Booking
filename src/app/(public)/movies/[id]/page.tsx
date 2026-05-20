import ReviewModal from "@/src/app/components/Layout/ReviewModal";
import ReviewSlider from "@/src/app/components/Layout/ReviewSlider";
import { moviesRoute } from "@/src/app/components/service/movie";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Video,
  Ticket,
  User,
  Calendar,
  Heart,
  Share2,
  Clock,
  Globe,
  ArrowUpRight,
  ChevronRight,
  Fullscreen,
} from "lucide-react";

export default async function ViewMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieData = await moviesRoute.getSingleMovies(id);
  const movie = movieData.data;
  const isPremium = String(movie.pricing) === "PREMIUM";

  return (
    <main className="min-h-screen bg-[#121315] pb-24">
      {/* CINEMATIC HERO */}
      <section className="relative pt-2 pb-12 bg-red-700">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
            {/* Backdrop */}
            <div className="relative h-[68vh] min-h-[560px]">
              {movie.posterUrl && (
                <Image
                  src={movie.posterUrl || "https://i.ibb.co.com/hJVWhyW1/mv1.jpg"}
                  alt=""
                  width={1800}
                  height={900}
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] opacity-50"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#121315] via-[#121315]/85 to-[#121315]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-transparent" />

              {/* Content grid */}
              <div className="relative h-full grid lg:grid-cols-12 gap-8 px-6 sm:px-10 lg:px-14 py-2">
                {/* Poster card */}
                <div className="lg:col-span-4 flex items-center">
                  <div className="relative w-full max-w-[340px] aspect-[2/3] rounded-3xl overflow-hidden border border-white/10 luxury-shadow group">
                    <Image
                      src={movie.posterUrl || "https://i.ibb.co.com/hJVWhyW1/mv1.jpg"}
                      width={500}
                      height={750}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121315]/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-8 flex flex-col justify-center gap-6">
                  {/* Breadcrumb */}
                  <nav className="flex items-center gap-1.5 text-[10px] text-white/45 tracking-[0.3em] uppercase">
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link
                      href="/movies"
                      className="hover:text-white transition-colors"
                    >
                      Films
                    </Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white truncate">{movie.title}</span>
                  </nav>

                  {/* Pricing chip */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] tracking-[0.3em] uppercase ${
                        isPremium
                          ? "bg-white text-[#121315]"
                          : "bg-white/[0.06] text-white/80 border border-white/10"
                      }`}
                    >
                      {String(movie.pricing)} access
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white text-[10px] tracking-wider uppercase">
                      <Star className="w-3 h-3 fill-white" />
                      HD · 4K
                    </span>
                  </div>

                  <h1
                    className="text-white font-light leading-[0.95] tracking-tight"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                  >
                    {movie.title}
                  </h1>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 items-center text-sm text-white/65">
                    <Meta icon={<User className="w-3.5 h-3.5" />} label="Director" value={movie.director} />
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <Meta icon={<Calendar className="w-3.5 h-3.5" />} label="Year" value={String(movie.releaseYear)} />
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <Meta icon={<Clock className="w-3.5 h-3.5" />} label="Runtime" value="2h 18m" />
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <Meta icon={<Globe className="w-3.5 h-3.5" />} label="Lang" value="EN · ES" />
                  </div>

                  <p className="text-white/70 text-base leading-relaxed max-w-2xl">
                    {movie.synopsis || "A new cinematic story — coming soon."}
                  </p>

                  {movie.streamingPlatforms?.length > 0 && (
                    <div>
                      <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase mb-2">
                        Streaming on
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {movie.streamingPlatforms.map(
                          (platform: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/75 text-xs hover:text-white hover:border-white/20 transition-colors"
                            >
                              {platform}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 mt-3">
                    <Link
                      href={`/checkout?movie=${id}`}
                      className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
                    >
                      <Ticket className="w-4 h-4" />
                      Book ticket
                      <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </Link>
                    <ReviewModal movieId={id} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER + REVIEWS */}
      <div className="max-w-[1400px]  mx-auto px-5 sm:px-8 mt-8 space-y-20">
        {movie.trailerUrl && (
          <section id="trailer">
            <SectionHeader
              icon={<Video className="w-4 h-4" />}
              eyebrow="Watch now"
              title="Official trailer"
            />
            <div className="rounded-2xl  overflow-hidden border border-white/8 bg-[#23262B] aspect-video luxury-shadow ">
              <iframe
                src={movie.trailerUrl}
                width={100}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section>
          <SectionHeader
            icon={<Star className="w-4 h-4" />}
            eyebrow="Community"
            title="Audience letters"
          />
          <ReviewSlider movieId={id} />
        </section>
      </div>
    </main>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70">
        {icon}
      </span>
      <span>
        <span className="block text-[10px] tracking-[0.3em] uppercase text-white/45">
          {label}
        </span>
        <span className="block text-white font-medium text-sm leading-none">
          {value}
        </span>
      </span>
    </span>
  );
}

function SectionHeader({
  icon,
  eyebrow,
  title,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
          {eyebrow}
        </p>
        <h2
          className="text-white font-light tracking-tight"
          style={{ fontSize: "1.6rem" }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
