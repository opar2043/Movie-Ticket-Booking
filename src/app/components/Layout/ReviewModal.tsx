"use client";

import { useEffect, useState } from "react";
import { reviewRoute } from "../service/review";
import { toast } from "sonner";
import { Star, X, LogIn } from "lucide-react";
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

  // ESC key close modal
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
      toast.error("Please write a review content.");
      return;
    }

    try {
      setLoading(true);

      const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

      await reviewRoute.createReview({
        movieId,
        rating,
        content,
        isSpoiler,
        tags: tagArray,
        userId: session.user.id,
        userName: session.user.name || "Anonymous",
      });

      toast.success("Review submitted! It will be visible after admin approval.");

      resetForm();

      // ✅ refresh Next.js data instead of full reload
      router.refresh();
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
      };

      toast.error(
        err.response?.data?.message || "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="h-12 w-40 bg-gray-100 animate-pulse rounded-lg" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="bg-[#141414] hover:bg-[#2B2B2B] text-white px-8 py-3 rounded-sm shadow font-medium transition-all flex items-center gap-2 group border border-[#2B2B2B]"
      >
        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#E50914]" />
        Login to Review
      </Link>
    );
  }

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#E50914] hover:bg-red-700 text-white px-8 py-3 rounded-sm shadow-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
      >
        <Star className="w-5 h-5 fill-current" />
        Rate and Review
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-8 w-full max-w-lg shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-white border-b-4 border-[#E50914] w-fit pb-1 mb-2">
                Share Your Review
              </h2>
              <p className="text-gray-400 font-medium">
                Help others by sharing your honest opinion.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Rating */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Your Rating
                  </label>
                  <span className="text-2xl font-black text-[#E50914]">{rating}/10</span>
                </div>

                <div className="flex justify-between gap-1 bg-[#000000] p-3 rounded-sm border border-[#2B2B2B]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} star`}
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Movie Tags
                </label>
                <input
                  type="text"
                  placeholder="e.g. Classic, Must Watch, Visual Masterpiece"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2B2B2B] text-white focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10 rounded-sm px-4 py-3 outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Detailed Review
                </label>

                <textarea
                  placeholder="Tell us more about the plot, characters, and direction..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#000000] border border-[#2B2B2B] text-white focus:border-[#E50914] focus:ring-4 focus:ring-[#E50914]/10 rounded-sm p-4 min-h-[120px] outline-none transition-all resize-none placeholder:text-gray-600"
                />
              </div>

              {/* Spoiler Toggle */}
              <div className="flex items-center gap-3 p-4 bg-[#000000] rounded-sm border border-[#2B2B2B]">
                <input 
                  type="checkbox" 
                  id="spoiler" 
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)}
                  className="w-5 h-5 accent-[#E50914] cursor-pointer"
                />
                <label htmlFor="spoiler" className="text-sm font-bold text-gray-300 cursor-pointer select-none">
                  Contains Spoilers? (Will be hidden initially)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                
                <button
                  type="submit"
                  disabled={loading || !content.trim()}
                  className="w-full py-4 bg-[#E50914] hover:bg-red-700 disabled:bg-[#2B2B2B] text-white rounded-sm font-black text-lg transition-all flex justify-center items-center gap-2 active:scale-95"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-sm animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "SUBMIT REVIEW"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-[#000000] border border-[#2B2B2B] text-gray-300 rounded-sm hover:bg-[#2B2B2B]"
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}