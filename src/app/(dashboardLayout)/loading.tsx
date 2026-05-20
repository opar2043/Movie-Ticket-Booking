import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-5 text-white">
      <div className="w-12 h-12 rounded-full bg-white text-[#121315] flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-white/45">
        Preparing your studio
      </p>

      <div className="w-full max-w-3xl mt-6 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl bg-[#23262B] border border-white/8 px-5 py-4 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="space-y-2">
                <div className="w-36 h-3 rounded-full bg-white/10" />
                <div className="w-24 h-3 rounded-full bg-white/5" />
              </div>
            </div>
            <div className="w-16 h-3 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
