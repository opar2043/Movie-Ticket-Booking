import React from "react";
import { Ticket, Calendar, User, Film } from "lucide-react";
import { purchaseRoute } from "@/src/app/components/service/purchase";

export default async function TicketsPage() {
  const responseData = await purchaseRoute.getPurchase();
  const purchases = Array.isArray(responseData)
    ? responseData
    : responseData?.data || [];

  const revenue = purchases.reduce(
    (sum: number, p: any) => sum + (p.price || 0),
    0,
  );

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          Box office · {purchases.length} tickets
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Every ticket, every{" "}
          <span className="italic font-serif text-white/80">cent.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl text-sm">
          A clean ledger of recent purchases and rentals — sortable, searchable,
          studio-grade.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-3xl bg-[#23262B] border border-white/8 p-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-2">
            Tickets sold
          </p>
          <p
            className="text-white font-light tracking-tight"
            style={{ fontSize: "1.8rem" }}
          >
            {purchases.length}
          </p>
        </div>
        <div className="rounded-3xl bg-[#23262B] border border-white/8 p-5">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-2">
            Gross revenue
          </p>
          <p
            className="text-white font-light tracking-tight"
            style={{ fontSize: "1.8rem" }}
          >
            ${revenue.toFixed(2)}
          </p>
        </div>
        <div className="rounded-3xl bg-[#23262B] border border-white/8 p-5 col-span-2 md:col-span-1">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-2">
            Avg. order
          </p>
          <p
            className="text-white font-light tracking-tight"
            style={{ fontSize: "1.8rem" }}
          >
            $
            {purchases.length
              ? (revenue / purchases.length).toFixed(2)
              : "0.00"}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#23262B] border border-white/8 overflow-hidden luxury-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#121315] border-b border-white/8">
              <tr>
                {[
                  "Transaction",
                  "Customer",
                  "Film",
                  "Date",
                  "Type",
                  "Price",
                ].map((h, i) => (
                  <th
                    key={h}
                    className={`px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-white/45 ${
                      i === 5 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-white/55">
                      <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <p className="text-base font-medium text-white">
                        No tickets yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                purchases.map((p: any) => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-6 py-4 text-white/50 font-mono text-xs">
                      {p.id.slice(0, 8)}…
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/65">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">
                            {p.user?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-white/45">
                            {p.user?.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-white/80">
                        <Film className="w-3.5 h-3.5 text-white/45" />
                        <span className="font-medium">
                          {p.movie?.title || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      <div className="inline-flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-white/45" />
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${
                          p.purchaseType === "BUY"
                            ? "bg-white text-[#121315] font-medium"
                            : "bg-white/[0.06] text-white/80 border border-white/10"
                        }`}
                      >
                        {p.purchaseType || "BUY"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                      ${p.price?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
