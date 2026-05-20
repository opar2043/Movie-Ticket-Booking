"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { reviewRoute } from "../service/review";
import { toast } from "sonner";
import { Star, X, LogIn, Loader2, ArrowUpRight } from "lucide-react";
import { useSession } from "@/src/app/(auth)/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReviewModal({ movieId }: { movieId: string }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const resetForm = () => {
    setContent("");
    setRating(5);
    setIsSpoiler(false);
    setTags("");
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to review.");
      return;
    }
    if (!content.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setLoading(true);
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await reviewRoute.createReview({
        movieId,
        rating,
        content,
        isSpoiler,
        tags: tagArray,
        userId: session.user.id,
        userName: session.user.name || "Anonymous",
      });
      toast.success("Review submitted — pending approval.");
      resetForm();
      router.refresh();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="h-11 w-40 bg-white/[0.04] animate-pulse rounded-full" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-white/85 hover:text-white text-xs font-medium transition-colors"
      >
        <LogIn className="w-3.5 h-3.5" />
        Sign in to review
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-white/85 hover:text-white text-xs font-medium transition-colors"
      >
        <Star className="w-3.5 h-3.5" />
        Rate & Review
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#121315]/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2rem] bg-[#23262B] border border-white/8 p-8 sm:p-10 w-full max-w-lg luxury-shadow relative text-white"
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="text-[10px] tracking-[0.4em] uppercase text-white/45 mb-3">
                Share your review
              </p>
              <h2
                className="text-white font-light leading-[1.05] tracking-tight"
                style={{ fontSize: "1.8rem" }}
              >
                Tell us how it{" "}
                <span className="italic font-serif text-white/80">made you feel.</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 mt-7">
                {/* Rating */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.35em] uppercase text-white/45">
                      Rating
                    </p>
                    <span className="text-2xl font-light tracking-tight">
                      {rating}
                      <span className="text-white/40 text-sm">/10</span>
                    </span>
                  </div>
                  <div className="flex justify-between gap-1 bg-[#121315] border border-white/8 rounded-2xl p-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} star`}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "fill-white text-white"
                              : "text-white/15"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-2">
                    Tags
                  </p>
                  <input
                    type="text"
                    placeholder="Classic, Must Watch, Visual Masterpiece"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl px-4 py-3 outline-none focus:border-white/30 transition-all"
                  />
                </div>

                {/* Review */}
                <div>
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-2">
                    Detailed review
                  </p>
                  <textarea
                    placeholder="Plot, performances, direction — your honest take."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl px-4 py-3 min-h-[120px] outline-none focus:border-white/30 transition-all resize-none"
                  />
                </div>

                {/* Spoiler */}
                <label className="flex items-center gap-3 p-4 bg-[#121315] rounded-2xl border border-white/8 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isSpoiler}
                    onChange={(e) => setIsSpoiler(e.target.checked)}
                    className="w-4 h-4 accent-white rounded-sm cursor-pointer"
                  />
                  <span className="text-sm text-white/80">
                    Contains spoilers (will be hidden initially)
                  </span>
                </label>

                <div className="flex flex-col gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit review
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-6 py-3 rounded-full border border-white/8 bg-transparent text-white/65 hover:text-white hover:bg-white/[0.04] text-sm font-medium transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
