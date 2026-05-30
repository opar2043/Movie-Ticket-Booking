"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Star } from "lucide-react";
import { MOVIE } from "../types/movies.type";

type Props = { m: MOVIE };

export default function MovieCard({ m }: Props) {
  return (
    <motion.div
    //  href={`/movies/${m.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-xl bg-[#23262B] border border-white/8 luxury-shadow"
    >
      {/* Image */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={m?.posterUrl || "https://res.cloudinary.com/dd0d558xp/image/upload/v1780155045/mv2_bsvhps.jpg"}
          alt={m.title}
          width={500}
          height={700}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121315] via-[#121315]/30 to-transparent" />

        {/* Floating chips */}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-white text-[10px] tracking-[0.25em] uppercase">
          {m.releaseYear}
        </span>
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#121315] text-[10px] font-bold tracking-wider uppercase">
          <Star className="w-3 h-3 fill-[#121315]" />
          HD
        </span>



        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-1.5">
            {m.director || "Director name not added"}
          </p>
          <h3 className="text-white text-xl font-medium tracking-tight line-clamp-1">
            {m.title}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 flex items-center justify-between border-t border-white/5">
        <div className="min-w-0">
          <p className="text-white/50 text-[11px] tracking-[0.3em] uppercase mb-1">
            {String(m.pricing) === "PREMIUM" ? "Premium access" : "Open access"}
          </p>
          <p className="text-white/80 text-sm line-clamp-1">
            {m.synopsis || "A new cinematic story."}
          </p>
        </div>
        <Link
          href={`/movies/${m.id}`}
          className="ml-3 w-10 h-10 shrink-0 rounded-full bg-white text-[#121315] flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300"
          aria-label={`View ${m.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
