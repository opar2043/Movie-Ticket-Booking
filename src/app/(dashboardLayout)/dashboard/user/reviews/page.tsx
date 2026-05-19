"use client";

import React, { useEffect, useState } from "react";
import { reviewRoute } from "@/src/app/components/service/review";
import { useAuth } from "@/src/app/(auth)/useAuth";
import { Trash2, Edit3, MessageSquare, Star, Clock, AlertCircle } from "lucide-react";
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
      toast.success("Review deleted successfully");
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      toast.error("You can only delete pending reviews.");
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <Star className="w-8 h-8 text-[#E50914] fill-[#E50914]" />
          My Reviews
        </h1>
        <p className="text-gray-400 mt-1 font-medium">Manage your reviews and feedback across CineVerse.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-bold animate-pulse text-xs uppercase tracking-widest">Gathering your thoughts...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-[#141414] rounded-sm border-2 border-dashed border-[#2B2B2B]">
            <MessageSquare className="w-16 h-16 text-[#2B2B2B] mx-auto mb-4" />
            <p className="text-xl font-black text-white italic">No Reviews Found</p>
            <p className="text-gray-400 font-medium">Start reviewing movies to see them here!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-[#141414] rounded-sm p-6 border border-[#2B2B2B] flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 bg-yellow-900/40 px-3 py-1 rounded-sm">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-yellow-500 font-black">{review.rating}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest ${
                    review.status === 'APPROVED' ? 'bg-green-900/40 text-green-500 border border-green-800' :
                    review.status === 'REJECTED' ? 'bg-red-900/40 text-red-500 border border-red-800' : 'bg-yellow-900/40 text-yellow-500 border border-yellow-800'
                  }`}>
                    {review.status}
                  </span>
                </div>

                <p className="text-gray-300 font-medium italic mb-4 line-clamp-4">
                  "{review.content}"
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags?.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2B2B2B] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>

                {review.status === "PENDING" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast.info("Editing coming soon!")}
                      className="p-2 text-gray-400 hover:text-[#E50914] hover:bg-black rounded-sm transition-all"
                      title="Edit Review"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-black rounded-sm transition-all"
                      title="Delete Review"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {review.status === "APPROVED" && (
                   <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase">
                     <AlertCircle className="w-3 h-3" />
                     Live on Portal
                   </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
