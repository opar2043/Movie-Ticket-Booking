"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Clapperboard, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Award-winning curation",
    desc: "A small editorial team obsessed with cinema — every film handpicked, every recommendation considered.",
  },
  {
    icon: <Clapperboard className="w-4 h-4" />,
    title: "Studio-grade design",
    desc: "Crafted with the same attention as a film's title sequence — every screen art-directed to feel premium.",
  },
];

export default function GetToKnowUs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image collage */}
          <div className="relative lg:col-span-6 h-[520px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-0 top-0 w-[60%] h-[380px] rounded-3xl overflow-hidden border border-white/8 luxury-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80"
                alt="cinema"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121315]/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="absolute right-0 bottom-0 w-[58%] h-[340px] rounded-3xl overflow-hidden border border-white/8 luxury-shadow"
            >
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=900&q=80"
                alt="reel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121315]/30 to-transparent" />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              className="absolute left-[42%] top-[44%] glass-strong rounded-2xl px-5 py-4 shadow-2xl"
            >
              <p
                className="text-white font-light tracking-tight leading-none"
                style={{ fontSize: "3rem" }}
              >
                20
              </p>
              <p className="text-[10px] text-white/60 tracking-[0.3em] uppercase mt-1">
                Years of cinema
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6">
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-5">
              The studio · 03
            </p>
            <h2
              className="text-white font-light leading-[0.98] tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              We build the{" "}
              <span className="italic font-serif text-white/80">
                quietest, most cinematic
              </span>{" "}
              way to experience film.
            </h2>
            <p className="text-white/60 mt-6 text-[15px] leading-relaxed max-w-lg">
              Movies OK is a small atelier of cinephiles, designers and
              engineers. We sweat the title cards, the timing of a fade, the
              feel of a checkout — because cinema deserves software with the same
              craft.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl bg-[#23262B] border border-white/8 p-5"
                >
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-4">
                    {f.icon}
                  </div>
                  <p className="text-white font-medium text-[15px] mb-1.5">
                    {f.title}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.2)]">
                About the Studio
                <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>

              <div className="hidden sm:block h-10 w-px bg-white/10" />

              <div className="hidden sm:block">
                <p className="text-[10px] text-white/40 tracking-[0.35em] uppercase">
                  Hiring
                </p>
                <p className="text-white font-medium text-sm mt-0.5">
                  Open roles in design & engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
