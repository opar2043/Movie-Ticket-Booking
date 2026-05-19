"use client";

import React, { useEffect, useState } from "react";
import { commentRoute } from "../service/comment";
import { useSession } from "@/src/app/(auth)/useAuth";
import { toast } from "sonner";
import { MessageSquare, Send, User } from "lucide-react";
import { CommentType } from "../types/comments.type";

export default function CommentSection({ reviewId }: { reviewId: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await commentRoute.getCommentsByReview(reviewId);
      const data = res?.data || res || [];
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to comment");
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentRoute.createComment({
        content: newComment,
        reviewId,
        userId: session.user.id,
      });
      toast.success("Comment submitted! Pending approval.");
      setNewComment("");
      // Optionally re-fetch, but it won't show up until approved
    } catch (error: any) {
      console.error("Post comment error:", error);
      toast.error(error.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border-t border-[#2B2B2B] pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-gray-500" />
        <h4 className="text-sm font-black text-white uppercase tracking-widest">In-Depth Discussion</h4>
      </div>

      <div className="space-y-4 mb-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No approved comments yet. Start the conversation!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 text-left bg-[#000000] p-3 rounded-sm border border-[#2B2B2B]">
              <div className="w-8 h-8 rounded-sm bg-[#141414] border border-[#2B2B2B] flex items-center justify-center text-[10px] text-white font-black shrink-0">
                {comment.user?.name?.[0] || <User className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-white">{comment.user?.name || "Viewer"}</p>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">{comment.content}</p>
                <p className="text-[10px] text-gray-500 font-bold">{new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {session ? (
        <form onSubmit={handleSubmit} className="relative group">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full bg-[#141414] border border-[#2B2B2B] focus:border-[#E50914] focus:bg-[#000000] rounded-sm px-4 py-3 text-xs outline-none transition-all placeholder:text-gray-600 pr-12 min-h-[80px] text-white font-medium"
          />
          <button 
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="absolute right-3 bottom-3 p-2 bg-[#141414] hover:bg-[#E50914] disabled:bg-[#2B2B2B] text-white rounded-sm transition-all shadow-lg active:scale-95"
          >
            {submitting ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-sm animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="bg-[#000000] border-2 border-dashed border-[#2B2B2B] rounded-sm p-4 text-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Join the conversation</p>
          <p className="text-[10px] text-gray-400 mt-1">Please login to add your comments.</p>
        </div>
      )}
    </div>
  );
}
