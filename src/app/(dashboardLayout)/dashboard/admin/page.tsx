"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Film,
  Users,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  PlusCircle,
  ShieldCheck,
  Ticket,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://moviebackend-eta.vercel.app/api/stats/dashboard",
      );
      if (res.data.success) setStats(res.data.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: <Film className="w-5 h-5" />,
      label: "Films catalogued",
      value: stats.totalMovies,
      suffix: "",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Active members",
      value: stats.totalUsers,
      suffix: "",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Tickets sold",
      value: stats.totalPurchases,
      suffix: "",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: "Total revenue",
      value: stats.totalRevenue,
      suffix: "$",
      money: true,
    },
  ];

  const quickActions = [
    {
      label: "Add a new film",
      desc: "Upload poster, trailer, synopsis & pricing.",
      icon: <PlusCircle className="w-4 h-4" />,
      href: "/dashboard/admin/movies",
    },
    {
      label: "Moderation queue",
      desc: "Approve or reject pending reviews and comments.",
      icon: <ShieldCheck className="w-4 h-4" />,
      href: "/dashboard/admin/moderation",
    },
    {
      label: "View tickets",
      desc: "Recent purchases, members and revenue lines.",
      icon: <Ticket className="w-4 h-4" />,
      href: "/dashboard/admin/tickets",
    },
  ];

  return (
    <div className="text-white">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10"
      >
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          Studio overview · Today
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          A snapshot of the{" "}
          <span className="italic font-serif text-white/80">cinema floor.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl">
          Real-time numbers across the catalogue, community and box office.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="relative rounded-3xl bg-[#23262B] border border-white/8 p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                {c.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/35" />
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-2">
              {c.label}
            </p>
            <p
              className="text-white font-light tracking-tight leading-none"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              {loading ? (
                <span className="inline-block w-24 h-7 rounded bg-white/10 animate-pulse" />
              ) : c.money ? (
                `$${(c.value as number).toFixed(2)}`
              ) : (
                c.value
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid lg:grid-cols-3 gap-4">
        {quickActions.map((a, i) => (
          <motion.div
            key={a.label}
            initial="hidden"
            animate="show"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
          >
            <Link
              href={a.href}
              className="group flex items-start gap-4 rounded-3xl bg-[#23262B] border border-white/8 hover:border-white/20 p-6 transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white shrink-0">
                {a.icon}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-[15px] mb-1.5">
                  {a.label}
                </p>
                <p className="text-white/55 text-sm leading-relaxed">
                  {a.desc}
                </p>
              </div>
              <span className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-[#121315] group-hover:rotate-45 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
