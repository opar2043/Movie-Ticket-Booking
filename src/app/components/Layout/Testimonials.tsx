"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  movie: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Carter",
    role: "Film Critic, The Folio",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&q=80",
    rating: 5,
    content:
      "Movies OK reads like a beautifully art-directed magazine, but works like a flawless booking app. Every detail — from the seat picker to the spoiler-safe reviews — feels considered.",
    movie: "The Way of Water",
  },
  {
    id: 2,
    name: "Marcus Reed",
    role: "Writer, Editorial Quarterly",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&q=80",
    rating: 5,
    content:
      "It's rare a platform feels this much like a love letter to cinema. The pacing, the typography, the way it lets a film breathe — it's the only place I book my weekly screenings now.",
    movie: "Shadow Protocol",
  },
  {
    id: 3,
    name: "Elena Park",
    role: "Curator, Lumen House",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&q=80",
    rating: 4,
    content:
      "Discovery is the hardest problem in cinema, and Movies OK has cracked it. The recommendations feel like a friend with impossibly good taste — never noisy, always on point.",
    movie: "Beyond The Stars",
  },
  {
    id: 4,
    name: "David Nguyen",
    role: "Cinephile",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&q=80",
    rating: 5,
    content:
      "Premium without being pretentious. The whole experience feels like stepping into a quiet, beautifully-lit theatre — which is exactly the energy a movie app should have.",
    movie: "Inception Returns",
  },
];

const stats = [
  { v: "12K+", l: "Films catalogued" },
  { v: "8.4M", l: "Tickets booked" },
  { v: "1.2M", l: "Active cinephiles" },
  { v: "57", l: "Industry awards" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-5">
            Letters from the audience · 02
          </p>
          <h2
            className="text-white font-light leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            What people say after the{" "}
            <span className="italic font-serif text-white/80">credits roll.</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
              className="rounded-3xl bg-[#23262B] border border-white/8 p-6 hover:bg-white/[0.04] transition-colors"
            >
              <p
                className="text-white font-light tracking-tight"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {s.v}
              </p>
              <p className="text-[11px] text-white/50 tracking-[0.3em] uppercase mt-2">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Featured testimonial */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 relative rounded-3xl bg-[#23262B] border border-white/8 p-8 md:p-12 overflow-hidden">
            <Quote className="absolute -top-2 -left-2 w-32 h-32 text-white/5" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating
                          ? "fill-white text-white"
                          : "text-white/15"
                      }`}
                    />
                  ))}
                  <span className="ml-3 text-[10px] tracking-[0.35em] uppercase text-white/40">
                    Verified review
                  </span>
                </div>

                <p
                  className="text-white font-light leading-[1.35] tracking-tight"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)" }}
                >
                  “{t.content}”
                </p>

                <div className="mt-10 flex items-center justify-between flex-wrap gap-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <p className="text-white font-medium text-[15px]">
                        {t.name}
                      </p>
                      <p className="text-white/50 text-xs tracking-wide">
                        {t.role} · <span className="text-white/80">{t.movie}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next"
                      className="w-10 h-10 rounded-full bg-white text-[#121315] flex items-center justify-center hover:scale-[1.05] transition-transform"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-7">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Review ${i + 1}`}
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-10 bg-white" : "w-4 bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {testimonials
              .filter((_, i) => i !== active)
              .slice(0, 3)
              .map((tm) => (
                <button
                  key={tm.id}
                  onClick={() =>
                    setActive(testimonials.findIndex((x) => x.id === tm.id))
                  }
                  className="text-left rounded-3xl bg-[#23262B] border border-white/8 hover:border-white/15 p-5 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={tm.avatar}
                      alt={tm.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {tm.name}
                      </p>
                      <p className="text-[11px] text-white/45 truncate">
                        {tm.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 text-white/80 text-[11px]">
                      <Star className="w-3 h-3 fill-white text-white" />
                      {tm.rating}.0
                    </div>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-2">
                    “{tm.content}”
                  </p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
