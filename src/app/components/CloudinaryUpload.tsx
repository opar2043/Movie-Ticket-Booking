"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload, ImagePlus } from "lucide-react";
import axios from "axios";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
  label = "Upload image",
}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary env vars missing — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local and restart the dev server.",
        );
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
      );
      if (response.data.secure_url) {
        onUploadSuccess(response.data.secure_url);
        toast.success("Image uploaded");
      } else {
        toast.error("Upload failed — no URL returned by Cloudinary.");
      }
    } catch (error: any) {
      // Surface Cloudinary's actual error response instead of axios's generic message
      const cloudinaryMessage = error?.response?.data?.error?.message;
      const status = error?.response?.status;
      const friendly =
        cloudinaryMessage ||
        error?.message ||
        "Error uploading image";
      console.error("Cloudinary upload failed:", {
        status,
        cloudinaryMessage,
        responseData: error?.response?.data,
        error,
      });
      toast.error(
        status ? `Cloudinary ${status}: ${friendly}` : friendly,
        { duration: 8000 },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-[#121315] border border-white/8 p-5">
      <p className="text-[10px] tracking-[0.35em] uppercase text-white/45 mb-3">
        {label}
      </p>

      <label className="relative block rounded-2xl border border-dashed border-white/15 hover:border-white/30 bg-[#23262B] transition-colors cursor-pointer overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={loading}
        />

        <div className="flex flex-col items-center justify-center py-8 gap-3">
          {preview ? (
            <div className="relative w-32 h-44 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {loading && (
                <div className="absolute inset-0 bg-[#121315]/70 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-white animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-white text-[#121315] flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(255,255,255,0.25)]">
                <ImagePlus className="w-6 h-6" />
              </div>
              <p className="text-sm text-white font-medium">
                Drop a poster, or browse
              </p>
              <p className="text-[11px] text-white/45">
                JPG · PNG · WEBP — up to 10MB
              </p>
            </>
          )}
        </div>
      </label>

      {loading && (
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-[0.35em] uppercase text-white/70 mt-4">
          <Upload className="w-3.5 h-3.5 animate-pulse" />
          Uploading to Cloudinary…
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
