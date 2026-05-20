"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviewRoute } from "@/src/app/components/service/review";
import { useAuth } from "@/src/app/(auth)/useAuth";
import {
  Trash2,
  Edit3,
  MessageSquare,
  Star,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { ReviewType } from "@/src/app/components/types/reviews.type";

export default function UserReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await reviewRoute.getReview(false);
        const data = res?.data || res || [];
        setReviews(data.filter((r: ReviewType) => r.userId === user.id));
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load your reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [user?.id]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewRoute.deleteReview(id, user?.id);
      toast.success("Review deleted");
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      toast.error("You can only delete pending reviews.");
    }
  };

  const statusStyles = (s: string) =>
    s === "APPROVED"
      ? "bg-white text-[#121315] font-medium"
      : s === "REJECTED"
      ? "bg-white/[0.04] border border-white/10 text-white/80"
      : "bg-white/[0.06] border border-white/15 text-white";

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          Your letters · {reviews.length} {reviews.length === 1 ? "entry" : "entries"}
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Your reviews,{" "}
          <span className="italic font-serif text-white/80">your voice.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl text-sm">
          Manage everything you've written across the studio — edit pending
          letters, delete drafts, see what's live.
        </p>
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/55">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
          <p className="text-[10px] tracking-[0.4em] uppercase">
            Gathering your thoughts
          </p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="relative rounded-[2rem] bg-[#23262B] border border-white/8 overflow-hidden min-h-[360px] flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#23262B]/40 to-[#23262B]" />
          <div className="relative text-center max-w-md mx-auto px-6 py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6">
              <MessageSquare className="w-9 h-9 text-white" />
            </div>
            <h2
              className="text-white font-light tracking-tight"
              style={{ fontSize: "1.6rem" }}
            >
              No reviews{" "}
              <span className="italic font-serif text-white/80">yet.</span>
            </h2>
            <p className="text-white/55 text-sm mt-3 leading-relaxed">
              Open any film and rate it to start contributing letters to the
              community.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className="group flex flex-col justify-between rounded-3xl bg-[#23262B] border border-white/8 hover:border-white/20 p-6 transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span className="text-white text-xs font-medium">
                      {review.rating}/10
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase ${statusStyles(
                      review.status,
                    )}`}
                  >
                    {review.status}
                  </span>
                </div>

                <p className="text-white/85 italic leading-relaxed line-clamp-4">
                  “{review.content}”
                </p>

                {review.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {review.tags.map((t, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/8 text-white/65 text-[10px] tracking-wide uppercase"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-white/8 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-white/45 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>

                {review.status === "PENDING" && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toast.info("Editing coming soon!")}
                      className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {review.status === "APPROVED" && (
                  <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-white/85">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Live
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
