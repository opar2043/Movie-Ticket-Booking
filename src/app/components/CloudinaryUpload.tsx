"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import axios from "axios";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ 
  onUploadSuccess, 
  label = "Upload Image" 
}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setLoading(true);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration missing in frontend .env");
      }

      // Direct upload to Cloudinary (Unsigned)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        onUploadSuccess(response.data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-2 border-dashed border-[#2B2B2B] rounded-sm hover:border-[#E50914] transition-all bg-[#000000] text-white">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      
      <div className="relative group cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={loading}
        />
        
        <div className="flex flex-col items-center justify-center py-6 gap-2 border border-[#2B2B2B] rounded-sm bg-[#141414] group-hover:bg-[#1f1f1f] transition-colors">
          {preview ? (
            <div className="relative w-32 h-44 rounded-sm overflow-hidden border border-[#2B2B2B] shadow-lg">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
              {loading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-[#E50914] animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="p-4 bg-black/40 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-[#E50914]" />
              </div>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Select Movie Poster</p>
              <p className="text-[10px] text-gray-600 font-medium">JPG, PNG or WEBP up to 10MB</p>
            </>
          )}
        </div>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center gap-2 text-xs font-black text-[#E50914] animate-pulse uppercase tracking-widest">
          <Loader2 className="w-4 h-4 animate-spin" />
          Uploading to Cloudinary...
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
