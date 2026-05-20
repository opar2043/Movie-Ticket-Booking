import Link from "next/link";
import { MessageSquare, Star, ArrowUpRight, Sparkles } from "lucide-react";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-[#121315] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-6">
          <Sparkles className="w-3 h-3" />
          Reviews
        </span>

        <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-7">
          <MessageSquare className="w-9 h-9 text-white" />
        </div>

        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Reviews live with{" "}
          <span className="italic font-serif text-white/80">each film.</span>
        </h1>
        <p className="text-white/60 mt-5 max-w-md mx-auto leading-relaxed">
          Open any title from our catalogue to read community letters and post
          your own — spoiler-safe, of course.
        </p>

        <div className="mt-9 flex items-center gap-3 justify-center flex-wrap">
          <Link
            href="/movies"
            className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.02] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
          >
            <Star className="w-4 h-4" />
            Browse films
            <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.04] text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
