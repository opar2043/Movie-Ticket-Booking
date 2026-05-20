"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Ticket,
  ArrowUpRight,
  Sparkles,
  Calendar,
  MapPin,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-2xl"
    >
      <div className="relative rounded-[2rem] border border-white/8 bg-[#23262B] overflow-hidden luxury-shadow">
        {/* Header */}
        <div className="relative p-10 text-center border-b border-white/8 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#23262B]/40 to-[#23262B]" />

          <div className="relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-white text-[#121315] flex items-center justify-center mb-5 shadow-[0_18px_40px_-10px_rgba(255,255,255,0.3)]">
              <CheckCircle2 className="w-9 h-9" strokeWidth={2.5} />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.35em] uppercase text-white/80 mb-4">
              <Sparkles className="w-3 h-3" />
              Payment confirmed
            </span>
            <h1
              className="text-white font-light tracking-tight leading-[1]"
              style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)" }}
            >
              Enjoy the{" "}
              <span className="italic font-serif text-white/80">show.</span>
            </h1>
            <p className="text-white/65 max-w-md mx-auto mt-3">
              Your ticket is confirmed. We've emailed a copy and saved it to
              your account.
            </p>
          </div>
        </div>

        {/* Ticket strip */}
        <div className="p-8">
          <div className="bg-[#121315] border border-white/8 rounded-2xl p-5 flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                E-Ticket
              </p>
              <p className="text-white font-medium text-sm">
                Movies OK Booking
              </p>
              {paymentIntentId && (
                <p className="text-[11px] text-white/40 mt-1 font-mono truncate">
                  TXN: {paymentIntentId}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                Amount
              </p>
              <p className="text-white font-light text-2xl tracking-tight">
                $19.99
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <Cell
              icon={<Calendar className="w-4 h-4" />}
              label="Showtime"
              value="Tonight · 8:30 PM"
            />
            <Cell
              icon={<MapPin className="w-4 h-4" />}
              label="Cinema"
              value="Movies OK · Hall A"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/"
              className="group flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.01] transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
            >
              Return home
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link
              href="/movies"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.04] text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Browse more films
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Cell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#121315] border border-white/8 rounded-2xl p-4 flex items-start gap-3">
      <span className="text-white shrink-0 mt-0.5">{icon}</span>
      <div>
        <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
          {label}
        </p>
        <p className="text-white font-medium text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#121315] flex items-center justify-center py-12 px-4">
      <Suspense
        fallback={<div className="text-white/55">Loading result…</div>}
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
