import Link from "next/link";
import { Heart, ArrowUpRight, Sparkles } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          Saved selection
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Your{" "}
          <span className="italic font-serif text-white/80">favourites.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl text-sm">
          Films you've heart-marked across the catalogue — ready to revisit on
          a quiet evening.
        </p>
      </div>

      {/* Empty state */}
      <div className="relative rounded-[2rem] bg-[#23262B] border border-white/8 overflow-hidden min-h-[400px] flex items-center justify-center luxury-shadow">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#23262B]/40 to-[#23262B]" />

        <div className="relative text-center max-w-md mx-auto px-6 py-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6">
            <Heart className="w-9 h-9 text-white" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-4">
            <Sparkles className="w-3 h-3" />
            Empty for now
          </span>
          <h2
            className="text-white font-light tracking-tight"
            style={{ fontSize: "1.6rem" }}
          >
            No favourites{" "}
            <span className="italic font-serif text-white/80">yet.</span>
          </h2>
          <p className="text-white/55 text-sm mt-3 leading-relaxed">
            Browse the catalogue and tap the heart icon on any film to start
            building your personal collection.
          </p>

          <Link
            href="/movies"
            className="group inline-flex items-center gap-2.5 mt-7 pl-5 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_10px_24px_-8px_rgba(255,255,255,0.25)]"
          >
            Discover films
            <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
