'use client'
import { moviesRoute } from "@/src/app/components/service/movie";
import { Clapperboard, Calendar, Users, ListVideo, Link as LinkIcon, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { MOVIE } from "../types/movies.type";
import CloudinaryUpload from "../CloudinaryUpload";

export default function EditMovieForm({ id }: { id: string }) {
  const [movieData, setMovieData] = useState<MOVIE | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const response = await moviesRoute.getSingleMovies(id);
        const data = response.data || response;
        setMovieData(data);
        if (data.posterUrl) {
          setPosterUrl(data.posterUrl);
        }
      } catch (error: any) {
        console.error("Failed to fetch movie:", error);
        toast.error("Failed to load movie details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  async function editMovieAction(e: any) {
    e.preventDefault();
    const frm = e.target;
    const title = frm.title.value;
    const synopsis = frm.synopsis.value;
    const releaseYear = parseInt(frm.releaseYear.value);
    const director = frm.director.value;
    const cast = frm.cast.value;
    const streamingPlatforms = frm.streamingPlatforms.value
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);
    const pricing = frm.pricing.value;
    const trailerUrl = frm.trailerUrl.value;

    const payload = {
      title,
      synopsis,
      releaseYear,
      director,
      cast,
      streamingPlatforms,
      pricing,
      posterUrl,
      trailerUrl,
    } as MOVIE;

    try {
      const response = await moviesRoute.updateMovies(id, payload);
      console.log(response);
      toast.success("Movie updated successfully");
    } catch (error: any) {
      console.error("Update movie error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to update movie");
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-[#E50914] animate-spin" />
        <p className="text-gray-500 font-medium">Loading movie details...</p>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="text-center p-12 bg-white rounded-md border border-gray-200">
        <p className="text-red-500 font-medium text-lg">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm p-6 sm:p-8 shadow-sm w-full max-w-4xl mx-auto text-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-[#E50914]" />
          EDIT YOUR MOVIE
        </h2>
        <p className="text-gray-400">Update the details for "{movieData.title}"</p>
      </div>

      <form onSubmit={editMovieAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Movie Title</label>
            <input
              name="title"
              required
              defaultValue={movieData.title}
              placeholder="Inception"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm text-lg"
            />
          </div>

          {/* Synopsis */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Synopsis</label>
            <textarea
              name="synopsis"
              defaultValue={movieData.synopsis || ""}
              placeholder="A brief description of the movie..."
              className="w-full bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm p-3 min-h-[100px]"
            />
          </div>

          {/* Release Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" /> Release Year
            </label>
            <input
              name="releaseYear"
              type="number"
              defaultValue={movieData.releaseYear}
              placeholder="2010"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" /> Pricing Model
            </label>
            <select
              name="pricing"
              defaultValue={movieData.pricing}
              className="w-full bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm p-2.5 cursor-pointer hover:bg-[#2B2B2B]"
            >
              <option value="FREE">Free Tier</option>
              <option value="PREMIUM">Premium / Paid</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" /> Director
            </label>
            <input
              name="director"
              defaultValue={movieData.director}
              placeholder="Christopher Nolan"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" /> Cast
            </label>
            <input
              name="cast"
              defaultValue={movieData.cast || ""}
              placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt..."
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <ListVideo className="w-4 h-4 text-gray-500" /> Streaming Platforms
            </label>
            <input
              name="streamingPlatforms"
              required
              defaultValue={movieData.streamingPlatforms?.join(", ")}
              placeholder="Netflix, Hulu, Amazon Prime (comma separated)"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm"
            />
          </div>

          {/* Poster Upload */}
          <div className="space-y-2 md:col-span-2">
            <CloudinaryUpload 
              label="Movie Poster Cover" 
              onUploadSuccess={(url) => setPosterUrl(url)} 
            />
            {posterUrl && (
              <div className="mt-2">
                <p className="text-[10px] text-gray-500 font-mono mb-2 truncate">
                  Current: {posterUrl}
                </p>
                <div className="w-24 h-36 rounded border border-[#2B2B2B] overflow-hidden">
                   <img src={posterUrl} alt="Poster preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-500" /> Trailer Video URL
            </label>
            <input
              name="trailerUrl"
              defaultValue={movieData.trailerUrl || ""}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] rounded-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 mt-8 border-t border-[#2B2B2B]">
          <button
            type="submit"
            className="w-full md:w-auto md:px-12 bg-[#E50914] hover:bg-red-700 text-white font-medium py-3 rounded-sm transition-colors flex justify-center items-center ml-auto"
          >
            Update Movie details
          </button>
        </div>
      </form>
    </div>
  );
}


