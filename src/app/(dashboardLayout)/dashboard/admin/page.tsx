"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Film, Users, CreditCard, DollarSign } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalPurchases: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://moviebackend-eta.vercel.app/api/stats/dashboard");
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  return (
    <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-[#E50914]" />
          Admin Platform Statistics
        </h1>
        <p className="text-gray-400 mt-1">Overview of your CineVerse activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Movies Card */}
        <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 flex flex-col items-center justify-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#E50914]/20 flex items-center justify-center mb-4">
            <Film className="w-6 h-6 text-[#E50914]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Movies</h2>
          <span className="text-4xl font-bold text-white">{stats.totalMovies}</span>
        </div>

        {/* Total Users Card */}
        <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 flex flex-col items-center justify-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Users</h2>
          <span className="text-4xl font-bold text-white">{stats.totalUsers}</span>
        </div>

        {/* Total Purchases Card */}
        <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 flex flex-col items-center justify-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Tickets Sold</h2>
          <span className="text-4xl font-bold text-white">{stats.totalPurchases}</span>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 flex flex-col items-center justify-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Revenue</h2>
          <span className="text-4xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</span>
        </div>

      </div>
    </div>
  );
}

// Add imported visual components if missing
import { LayoutDashboard } from "lucide-react";
