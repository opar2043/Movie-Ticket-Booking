
import Image from "next/image";
import { MOVIE } from "../types/movies.type";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  m: MOVIE;
};

export default function MovieCard({ m }: Props) {
  return (
    <div className="bg-[#141414] border border-[#2B2B2B] rounded-sm shadow-md overflow-hidden hover:shadow-[#E50914]/20 hover:shadow-lg transition">
      
      {/* Image */}
      <div className="h-48 bg-[#2B2B2B]">
        <Image
          src={m.posterUrl || "/placeholder.jpg"}
          alt={m.title}
          width={300}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-white tracking-tight">{m.title}</h2>
        <p className="text-sm text-gray-400">{m.releaseYear}</p>

        <p className="text-sm mt-2 line-clamp-2 text-gray-300">
          {m.synopsis || "No description available"}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-[#2B2B2B] text-gray-300 px-2 py-1 rounded-sm border border-[#2B2B2B]">
            {m.pricing}
          </span>

          <Link href={`/movies/${m.id}`} className="text-sm hover:text-white hover:bg-[#E50914] cursor-pointer bg-white text-black px-3 py-1 rounded-md font-semibold flex items-center gap-2 transition-colors">
            View <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}