"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reviewRoute } from "../service/review";
import { ReviewType } from "../types/reviews.type";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import CommentSection from "./CommentSection";

export default function ReviewSlider({ movieId }: { movieId: string }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [revealedSpoilers, setRevealedSpoilers] = useState<
    Record<string, boolean>
  >({});
  const [activeComments, setActiveComments] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const allReviews = await reviewRoute.getReview();
        const data = allReviews.data || allReviews;
        const filtered = data.filter(
          (rev: ReviewType) =>
            rev.movieId === movieId && rev.status === "APPROVED",
        );
        setReviews(filtered);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) fetchReviews();
  }, [movieId]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const toggleSpoiler = (id: string) =>
    setRevealedSpoilers((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleComments = (id: string) =>
    setActiveComments((prev) => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 rounded-3xl bg-[#23262B] border border-white/8 border-dashed">
        <p className="text-white/65">No approved letters yet.</p>
        <p className="text-white/40 text-xs mt-1">
          Be the first to share your thoughts.
        </p>
      </div>
    );
  }

  const review = reviews[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
          Letter{" "}
          <span className="text-white font-medium">{currentIndex + 1}</span> of{" "}
          <span className="text-white font-medium">{reviews.length}</span>
        </p>
        {reviews.length > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              aria-label="Previous review"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/65 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next review"
              className="w-9 h-9 rounded-full bg-white text-[#121315] flex items-center justify-center hover:scale-[1.06] transition-transform"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-3xl bg-[#23262B] border border-white/8 overflow-hidden luxury-shadow"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white font-medium text-sm">
                {review.userName?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {review.userName || "Anonymous"}
                </p>
                <p className="text-[11px] text-white/45 mt-0.5">
                  {new Date(review.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white text-xs">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                {review.rating}/10
              </div>
            </div>
          </div>

          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-6 pt-4">
              {review.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-white/70 border border-white/8 text-[10px] tracking-wide uppercase"
                >
                  #{tag}
                </span>
              ))}
              {review.isSpoiler && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 text-[10px] tracking-wide uppercase flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Spoiler
                </span>
              )}
            </div>
          )}

          <div className="px-6 py-5">
            {review.isSpoiler && !revealedSpoilers[review.id] ? (
              <div className="relative rounded-2xl border border-white/8 border-dashed bg-[#121315] p-5">
                <p className="text-white/45 blur-sm select-none text-sm leading-relaxed">
                  {review.content}
                </p>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-sm bg-[#121315]/40 rounded-2xl">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/80">
                    Contains spoilers
                  </p>
                  <button
                    onClick={() => toggleSpoiler(review.id)}
                    className="px-4 py-2 rounded-full bg-white text-[#121315] text-xs font-medium hover:scale-[1.02] transition-transform"
                  >
                    Reveal content
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white/85 text-base leading-relaxed italic">
                “{review.content}”
              </p>
            )}
          </div>

          <div className="px-6 pb-5 border-t border-white/8 pt-4">
            <button
              onClick={() => toggleComments(review.id)}
              className="inline-flex items-center gap-1.5 text-xs text-white/55 hover:text-white transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {activeComments[review.id]
                ? "Hide discussion"
                : "View discussion"}
            </button>
          </div>

          {activeComments[review.id] && (
            <div className="border-t border-white/8 px-6 py-5 bg-[#121315]">
              <CommentSection reviewId={review.id} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {reviews.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-10 bg-white"
                  : "w-4 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
