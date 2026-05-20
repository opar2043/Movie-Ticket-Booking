"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  Compass,
  Trophy,
  Film,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowUpRight,
  Quote,
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-4 h-4" />,
    title: "Create your account",
    desc: "Sign up in under 30 seconds. No card required — explore freely.",
  },
  {
    icon: <Compass className="w-4 h-4" />,
    title: "Discover the catalogue",
    desc: "Curated collections, retrospectives, indie gems, the latest blockbusters.",
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Book and enjoy",
    desc: "Reserve a seat in three taps, get instant tickets, share the moment.",
  },
];

const values = [
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    title: "Trust by design",
    desc: "Secure checkouts, transparent pricing, verified reviews — always.",
  },
  {
    icon: <Heart className="w-4 h-4" />,
    title: "Made by cinephiles",
    desc: "Every detail handled by people who genuinely love cinema.",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    title: "Effortless craft",
    desc: "Fast, beautiful, intuitive — from first scroll to final ticket.",
  },
  {
    icon: <Film className="w-4 h-4" />,
    title: "Cinema everywhere",
    desc: "40+ countries, hundreds of theatres, one editorial home.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage({ embedded = false }: { embedded?: boolean }) {
  return (
    <main className={embedded ? "" : "bg-[#121315]"}>
      {/* HERO */}
      {!embedded && (
        <section className="relative pt-2 pb-16">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
            <div className="relative h-[60vh] min-h-[480px] rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
              <img
                src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1800&q=80"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#121315]/30 via-[#121315]/60 to-[#121315]" />

              <div className="relative h-full flex flex-col justify-end p-8 sm:p-14 max-w-4xl">
                <span className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-6">
                  <Quote className="w-3 h-3" />
                  Our Story
                </span>
                <h1
                  className="text-white font-light leading-[0.95] tracking-tight"
                  style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
                >
                  We make cinema{" "}
                  <span className="italic font-serif text-white/80">
                    effortless.
                  </span>
                </h1>
                <p className="text-white/70 mt-5 text-lg max-w-2xl leading-relaxed">
                  Movies OK is a premium ticketing and discovery platform built
                  for people who love film. Beautiful design, effortless
                  booking, every detail art-directed.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "12K+", l: "Films catalogued" },
              { v: "8.4M", l: "Tickets booked" },
              { v: "40+", l: "Countries" },
              { v: "1.2M", l: "Happy cinephiles" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fade}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-3xl bg-[#23262B] border border-white/8 p-7"
              >
                <p
                  className="text-white font-light tracking-tight leading-none"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
                >
                  {s.v}
                </p>
                <p className="text-[11px] text-white/45 tracking-[0.3em] uppercase mt-3">
                  {s.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-5">
              How it works · 04
            </p>
            <h2
              className="text-white font-light leading-[0.98] tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Three steps to your{" "}
              <span className="italic font-serif text-white/80">next film.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fade}
                transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
                className="relative rounded-3xl bg-[#23262B] border border-white/8 p-8 overflow-hidden"
              >
                <span
                  className="absolute top-5 right-6 text-white/[0.05] font-light"
                  style={{ fontSize: "5rem" }}
                >
                  0{i + 1}
                </span>
                <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-5">
                  {s.icon}
                </div>
                <h3 className="text-white font-medium text-lg mb-2.5">
                  {s.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-5">
          {[
            {
              label: "Vision",
              title: "A world where every story finds its audience.",
              body: "Borderless cinema — a film made in Tokyo selling out a theatre in São Paulo, with every moviegoer one tap away from their next favourite story.",
              img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
            },
            {
              label: "Mission",
              title: "Build the most beautiful way to experience film.",
              body: "We sweat the title cards, the spacing, the spoiler-safe reviews — because the love of movies deserves software just as thoughtful.",
              img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
            },
          ].map((b) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-white/8 luxury-shadow min-h-[440px]"
            >
              <img src={b.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-[#121315]/70 to-[#121315]/10" />
              <div className="relative h-full flex flex-col justify-end p-8 sm:p-10">
                <p className="text-[11px] tracking-[0.45em] uppercase text-white/60 mb-3">
                  {b.label}
                </p>
                <h3
                  className="text-white font-light leading-[1.05] tracking-tight mb-4"
                  style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
                >
                  {b.title}
                </h3>
                <p className="text-white/70 leading-relaxed max-w-md">
                  {b.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="max-w-3xl mb-14">
            <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-5">
              What we stand for · 05
            </p>
            <h2
              className="text-white font-light leading-[0.98] tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
            >
              Four values,{" "}
              <span className="italic font-serif text-white/80">no compromise.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fade}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-3xl bg-[#23262B] border border-white/8 p-6 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white mb-5">
                  {v.icon}
                </div>
                <p className="text-white font-medium text-[15px] mb-1.5">
                  {v.title}
                </p>
                <p className="text-white/55 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121315] via-[#121315]/85 to-[#121315]/30" />

            <div className="relative h-full flex flex-col justify-center p-10 md:p-16 max-w-2xl">
              <p className="text-[11px] tracking-[0.45em] uppercase text-white/60 mb-5">
                Begin · 06
              </p>
              <h3
                className="text-white font-light leading-[1] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)" }}
              >
                Ready to find your{" "}
                <span className="italic font-serif text-white/80">next film?</span>
              </h3>
              <p className="text-white/70 mt-5 max-w-md leading-relaxed">
                Join 1.2M+ cinephiles already booking, reviewing and discovering
                on Movies OK.
              </p>

              <div className="mt-9 flex items-center gap-3 flex-wrap">
                <Link
                  href="/movies"
                  className="group inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white text-[#121315] text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
                >
                  Browse films
                  <span className="w-9 h-9 rounded-full bg-[#121315] text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white text-sm font-medium hover:bg-white/[0.08] transition-colors"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
