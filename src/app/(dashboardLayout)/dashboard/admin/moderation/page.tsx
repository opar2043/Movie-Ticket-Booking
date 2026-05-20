"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviewRoute } from "@/src/app/components/service/review";
import { commentRoute } from "@/src/app/components/service/comment";
import {
  ShieldAlert,
  Check,
  X,
  Star,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { ReviewType } from "@/src/app/components/types/reviews.type";
import { CommentType } from "@/src/app/components/types/comments.type";
import { cn } from "@/src/app/components/lib/utils";

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState<"reviews" | "comments">("reviews");
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "reviews") {
        const res = await reviewRoute.getReview(true);
        const data = res?.data || res || [];
        setReviews(data.filter((r: ReviewType) => r.status === "PENDING"));
      } else {
        const res = await commentRoute.getAllComments(true, "PENDING");
        const data = res?.data || res || [];
        setComments(data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch moderation data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleReviewStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      await reviewRoute.updateReviewStatus(id, status);
      toast.success(`Review ${status.toLowerCase()}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const handleCommentStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      await commentRoute.updateCommentStatus(id, status);
      toast.success(`Comment ${status.toLowerCase()}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const pendingCount = activeTab === "reviews" ? reviews.length : comments.length;

  return (
    <div className="text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8"
      >
        <div>
          <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
            Moderation queue
          </p>
          <h1
            className="text-white font-light leading-[1] tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Keep the community{" "}
            <span className="italic font-serif text-white/80">honest.</span>
          </h1>
          <p className="text-white/55 mt-3 max-w-xl text-sm">
            Approve or reject pending reviews and comments to maintain the
            studio's editorial bar.
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex p-1.5 rounded-full bg-[#23262B] border border-white/8 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-medium transition-all",
              activeTab === "reviews"
                ? "bg-white text-[#121315]"
                : "text-white/65 hover:text-white",
            )}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-medium transition-all",
              activeTab === "comments"
                ? "bg-white text-[#121315]"
                : "text-white/65 hover:text-white",
            )}
          >
            Comments
          </button>
        </div>
      </motion.div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { l: "Pending", v: pendingCount, accent: true },
          { l: "Approved today", v: "—" },
          { l: "Rejected today", v: "—" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-3xl bg-[#23262B] border border-white/8 p-5"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-2">
              {s.l}
            </p>
            <p
              className={cn(
                "font-light tracking-tight",
                s.accent ? "text-white" : "text-white/85",
              )}
              style={{ fontSize: "1.8rem" }}
            >
              {s.v}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-[#23262B] border border-white/8 overflow-hidden luxury-shadow">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/55">
              Loading queue
            </p>
          </div>
        ) : activeTab === "reviews" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121315] border-b border-white/8">
                  {["User & rating", "Content", "Metadata", "Decision"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-white/45",
                          i === 3 && "text-right",
                        )}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <EmptyState
                        title="Queue is empty"
                        subtitle="All reviews have been processed."
                      />
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white font-medium text-sm">
                            {review.userName?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {review.userName || "Unknown"}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/85 text-[11px]">
                              <Star className="w-3 h-3 fill-white text-white" />
                              {review.rating}/10
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-md">
                        <p className="text-sm text-white/80 leading-relaxed italic line-clamp-2">
                          “{review.content}”
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            {review.isSpoiler && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/30 text-[10px] tracking-wide uppercase">
                                <AlertTriangle className="w-3 h-3" />
                                Spoiler
                              </span>
                            )}
                            {review.tags?.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-white/[0.04] text-white/70 border border-white/8 text-[10px] tracking-wide uppercase"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] text-white/40">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DecisionBtn
                            onClick={() =>
                              handleReviewStatus(review.id, "APPROVED")
                            }
                            variant="approve"
                          />
                          <DecisionBtn
                            onClick={() =>
                              handleReviewStatus(review.id, "REJECTED")
                            }
                            variant="reject"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121315] border-b border-white/8">
                  {["User", "Comment", "Parent review", "Decision"].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-white/45",
                          i === 3 && "text-right",
                        )}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8">
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center">
                      <EmptyState
                        title="No pending comments"
                        subtitle="Everyone's being polite."
                      />
                    </td>
                  </tr>
                ) : (
                  comments.map((comment: any) => (
                    <tr
                      key={comment.id}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white font-medium text-sm">
                            {comment.user?.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {comment.user?.name || "Unknown"}
                            </p>
                            <p className="text-[11px] text-white/45 mt-0.5">
                              {comment.review?.movie?.title ||
                                "Movie discussion"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 max-w-xs">
                        <p className="text-sm text-white/80 italic leading-relaxed line-clamp-2">
                          “{comment.content}”
                        </p>
                        <p className="text-[11px] text-white/40 mt-1.5">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="border-l-2 border-white/10 pl-3 max-w-xs">
                          <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-1">
                            In reply to
                          </p>
                          <p className="text-xs text-white/55 italic leading-relaxed line-clamp-2">
                            “{comment.review?.content}”
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <DecisionBtn
                            onClick={() =>
                              handleCommentStatus(comment.id, "APPROVED")
                            }
                            variant="approve"
                          />
                          <DecisionBtn
                            onClick={() =>
                              handleCommentStatus(comment.id, "REJECTED")
                            }
                            variant="reject"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function DecisionBtn({
  onClick,
  variant,
}: {
  onClick: () => void;
  variant: "approve" | "reject";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all",
        variant === "approve"
          ? "bg-white text-[#121315] hover:scale-[1.02]"
          : "bg-white/[0.04] border border-white/10 text-white/75 hover:text-white hover:bg-white/[0.08]",
      )}
    >
      {variant === "approve" ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Approve
        </>
      ) : (
        <>
          <X className="w-3.5 h-3.5" />
          Reject
        </>
      )}
    </button>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-white/55">
      <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
        <ShieldAlert className="w-5 h-5" />
      </div>
      <p className="text-base font-medium text-white">{title}</p>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
}
