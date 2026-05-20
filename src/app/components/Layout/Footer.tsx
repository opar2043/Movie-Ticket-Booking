"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MapPin, Phone, Send } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";
import { toast } from "sonner";

const filmLinks = [
  { label: "Now Showing", href: "/movies" },
  { label: "Coming Soon", href: "/movies" },
  { label: "Editorial Picks", href: "/movies" },
  { label: "Director Series", href: "/movies" },
];

const studioLinks = [
  { label: "About Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Press", href: "/contact" },
  { label: "Careers", href: "/contact" },
];

const supportLinks = [
  { label: "Help Center", href: "/contact" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Refunds", href: "#" },
];

const socials = [
  { icon: <FaFacebookF className="w-3 h-3" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-3 h-3" />, href: "#", label: "Twitter" },
  { icon: <FaInstagram className="w-3 h-3" />, href: "#", label: "Instagram" },
  { icon: <FaYoutube className="w-3 h-3" />, href: "#", label: "YouTube" },
  { icon: <FaPinterestP className="w-3 h-3" />, href: "#", label: "Pinterest" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed — welcome to the studio");
    setEmail("");
  };

  return (
    <footer className="relative bg-[#121315] text-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-10">
        {/* Editorial mark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-[#23262B] border border-white/8 p-8 sm:p-12 mb-16"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-4">
                Editorial Letter
              </p>
              <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.05]">
                Stories from the
                <br />
                <span className="italic font-serif text-white/80">
                  cutting room
                </span>{" "}
                — every Friday.
              </h3>
              <p className="text-white/60 mt-5 max-w-md text-[15px] leading-relaxed">
                A curated newsletter of releases, retrospectives and
                behind-the-lens features. Slow reading. No noise. Unsubscribe
                anytime.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 p-1.5 rounded-full bg-[#121315] border border-white/8"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-transparent border-0 outline-none text-white text-sm placeholder:text-white/40"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-white text-[#121315] px-5 py-3 rounded-full text-sm font-medium hover:scale-[1.02] transition-transform shadow-[0_10px_24px_-6px_rgba(255,255,255,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-white text-[#121315] flex items-center justify-center font-bold tracking-tighter shadow-[0_12px_30px_-6px_rgba(255,255,255,0.18)]">
                M
              </div>
              <div className="leading-tight">
                <span className="block text-white font-medium text-lg tracking-tight">
                  Movies OK
                </span>
                <span className="block text-[10px] text-white/40 tracking-[0.3em] uppercase">
                  Cinema Atelier
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed mt-7 max-w-md">
              A cinematic editorial platform — discover, book, and review the
              world's most beautiful films, curated by people who live for
              cinema.
            </p>

            <div className="mt-8 flex flex-col gap-3 text-sm text-white/60">
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/8 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                </span>
                350 Fifth Avenue, New York, NY 10118
              </span>
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/8 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-white/70" />
                </span>
                +1 (800) 123-4567
              </span>
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/8 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-white/70" />
                </span>
                hello@moviesok.com
              </span>
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Films", items: filmLinks },
            { title: "Studio", items: studioLinks },
            { title: "Support", items: supportLinks },
          ].map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <p className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-5">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.items.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] text-white/70 hover:text-white transition-colors"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Apps */}
          <div className="lg:col-span-1">
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-5">
              Apps
            </p>
            <div className="flex flex-col gap-2.5">
              {["iOS", "Android"].map((p) => (
                <a
                  key={p}
                  href="#"
                  className="group flex items-center justify-between gap-2 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/8 hover:bg-white/[0.08] hover:border-white/15 text-white/80 hover:text-white text-xs transition-all"
                >
                  <span className="font-medium tracking-wide">{p}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} Movies OK — a cinematic editorial.
            All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center text-white/60 hover:text-[#121315] hover:bg-white hover:border-white transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
