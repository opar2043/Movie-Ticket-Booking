"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  ArrowUpRight,
  Star,
  Clock,
} from "lucide-react";

interface Slide {
  id: number;
  category: string;
  title: string;
  director: string;
  year: string;
  runtime: string;
  rating: string;
  description: string;
  image: string;
  thumb: string;
}

const slides: Slide[] = [
  {
    id: 1,
    category: "Adventure · Drama",
    title: "The Way of Water",
    director: "James Cameron",
    year: "2024",
    runtime: "2h 38m",
    rating: "9.2",
    description:
      "A breathtaking journey beneath the surface — where light becomes language and silence carries the weight of a thousand stories.",
    image:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
  },
  {
    id: 2,
    category: "Thriller · Action",
    title: "Shadow Protocol",
    director: "Elena Vasquez",
    year: "2024",
    runtime: "2h 12m",
    rating: "8.7",
    description:
      "When silence becomes the loudest weapon — a contemporary noir told in long, unflinching takes through the alleys of Marseille.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  },
  {
    id: 3,
    category: "Science Fiction",
    title: "Beyond the Stars",
    director: "Chen Wei",
    year: "2024",
    runtime: "2h 45m",
    rating: "9.0",
    description:
      "The universe is closer than you think. A poetic meditation on memory, light and the spaces between heartbeats.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative pt-2 pb-16">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="relative h-[78vh] min-h-[640px] rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
          {/* Background images */}
          <AnimatePresence mode="sync">
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </AnimatePresence>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121315]/95 via-[#121315]/60 to-[#121315]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-transparent" />

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          {/* Content */}
          <div className="relative h-full grid lg:grid-cols-12 gap-8 px-6 sm:px-10 lg:px-14 py-10 lg:py-16">
            {/* Left content */}
            <div className="lg:col-span-7 flex flex-col justify-end max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <p className="text-[11px] tracking-[0.45em] uppercase text-white/60 mb-5">
                    Featured · {slide.category}
                  </p>
                  <h1 className="text-white font-light leading-[0.95] tracking-tight"
                      style={{ fontSize: "clamp(2.75rem, 7vw, 5.75rem)" }}>
                    {slide.title.split(" ").map((w, i) => (
                      <span key={i} className={i % 2 === 1 ? "italic font-serif text-white/80" : ""}>
                        {w}{" "}
                      </span>
                    ))}
                  </h1>
                  <p className="text-white/70 mt-6 text-base md:text-lg leading-relaxed max-w-xl">
                    {slide.description}
                  </p>

                  <div className="mt-7 flex items-center gap-5 text-white/60 text-xs tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      {slide.rating}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {slide.runtime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>Dir. {slide.director}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{slide.year}</span>
                  </div>

                  <div className="mt-9 flex items-center gap-3 flex-wrap">
                    <button className="group inline-flex items-center gap-3 bg-white text-[#121315] pl-6 pr-2 py-2 rounded-full font-medium text-sm hover:scale-[1.02] transition-transform shadow-[0_18px_40px_-10px_rgba(255,255,255,0.25)]">
                      Book Ticket
                      <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </button>
                    <button className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white text-sm font-medium hover:bg-white/[0.08] transition-colors">
                      <PlayCircle className="w-4 h-4" />
                      Watch Trailer
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right floating thumbs */}
            <div className="hidden lg:flex lg:col-span-5 items-end justify-end">
              <div className="glass rounded-3xl p-4 max-w-sm w-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/50">
                    Now Featuring
                  </p>
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px] tracking-widest">
                    <span className="text-white font-semibold">
                      {String(current + 1).padStart(2, "0")}
                    </span>
                    /
                    <span>{String(slides.length).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrent(i)}
                      className="relative group aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
                    >
                      <img
                        src={s.thumb}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-transparent to-transparent" />
                      {i === current && (
                        <motion.span
                          layoutId="hero-active"
                          className="absolute inset-0 ring-2 ring-white rounded-2xl"
                          transition={{ duration: 0.45 }}
                        />
                      )}
                      <p className="absolute bottom-2 left-2 right-2 text-[10px] text-white font-medium truncate">
                        {s.title}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
                  <p className="text-[11px] text-white/50">
                    Swipe through this week's selection
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prev}
                      aria-label="Previous"
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next"
                      className="w-8 h-8 rounded-full bg-white text-[#121315] flex items-center justify-center hover:scale-[1.06] transition-transform"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom progress strip */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 flex items-center gap-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 hidden md:block">
              Reel 01 — Curated this week
            </p>
            <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
              <motion.span
                key={slide.id}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
                className="absolute top-0 left-0 h-px bg-white"
              />
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              {slide.year}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
