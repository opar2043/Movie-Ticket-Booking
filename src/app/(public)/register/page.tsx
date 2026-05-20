"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "@/src/app/(auth)/firebase.config";
import {
  fetchDbUserByEmail,
  redirectPathForRole,
  UserRole,
} from "@/src/app/(auth)/useAuth";
import api from "@/src/app/components/service/api";
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowUpRight,
  Loader2,
  Check,
  Sparkles,
  PlayCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const strength = (() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 10) s++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const strengthLabel =
    ["Weak", "Fair", "Good", "Strong"][Math.max(0, strength - 1)];

  async function registerAction(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const pw = (form.elements.namedItem("password") as HTMLInputElement).value;

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pw);
      if (cred.user && name)
        await updateProfile(cred.user, { displayName: name });
      await api.post("/users", { name, email, role: UserRole.USER });

      const dbUser = await fetchDbUserByEmail(email);
      const target = redirectPathForRole(dbUser?.role);

      toast.success("Welcome to Movies OK");
      router.push(target);
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121315] text-white">
      <div className="max-w-[1400px] mx-auto min-h-screen grid lg:grid-cols-2 gap-6 px-5 sm:px-8 py-8">
        {/* LEFT — Form */}
        <div className="order-2 lg:order-1 flex items-center justify-center rounded-[2rem] border border-white/8 bg-[#23262B] p-8 sm:p-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Link
              href="/"
              className="lg:hidden flex items-center gap-3 mb-8 justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#121315] flex items-center justify-center font-bold">
                M
              </div>
              <span className="font-medium text-lg">Movies OK</span>
            </Link>

            <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-4">
              Create account
            </p>
            <h1
              className="text-white font-light leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Join the{" "}
              <span className="italic font-serif text-white/80">
                cinematic universe.
              </span>
            </h1>
            <p className="text-white/55 mt-3">
              Sign up free. Book, save, and review — 1.2M+ cinephiles already
              inside.
            </p>

            <form onSubmit={registerAction} className="mt-8 space-y-4">
              <FieldLabel label="Full name">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                <input
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl focus:outline-none focus:border-white/30 transition-all"
                />
              </FieldLabel>

              <FieldLabel label="Email">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl focus:outline-none focus:border-white/30 transition-all"
                />
              </FieldLabel>

              <FieldLabel label="Password">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-11 pr-11 py-3.5 bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl focus:outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/45 hover:text-white"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </FieldLabel>

              {password.length > 0 && (
                <div className="-mt-1">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i < strength ? "bg-white" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-white/55 mt-1.5 tracking-wide">
                    Strength:{" "}
                    <span className="text-white font-medium">
                      {strengthLabel || "Too short"}
                    </span>
                  </p>
                </div>
              )}

              <label className="flex items-start gap-2 text-xs text-white/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-0.5 accent-white rounded-sm"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-white hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating
                    account…
                  </>
                ) : (
                  <>
                    Create free account
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/55">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-white font-medium hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>

        {/* RIGHT — Cinematic */}
        <div className="order-1 lg:order-2 relative hidden lg:block rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
          <img
            src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#121315] via-[#121315]/70 to-[#121315]/20" />

          <div className="relative h-full flex flex-col justify-between p-10">
            <Link href="/" className="flex items-center gap-3 group w-fit self-end">
              <div className="w-11 h-11 rounded-full bg-white text-[#121315] flex items-center justify-center font-bold tracking-tighter">
                M
              </div>
              <div className="leading-tight">
                <span className="block text-white font-medium tracking-tight">
                  Movies OK
                </span>
                <span className="block text-[10px] text-white/50 tracking-[0.3em] uppercase">
                  Cinema Atelier
                </span>
              </div>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-md"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] tracking-[0.3em] uppercase text-white/80 mb-6">
                <Sparkles className="w-3 h-3" />
                Free Forever
              </span>
              <h2
                className="text-white font-light leading-[1] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              >
                Every great story{" "}
                <span className="italic font-serif text-white/80">
                  starts here.
                </span>
              </h2>
              <p className="text-white/70 mt-5 leading-relaxed">
                Create your account in 30 seconds and unlock the full Movies OK
                experience.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {[
                  "Instant ticket booking, no fees",
                  "Spoiler-safe community reviews",
                  "Curated personal recommendations",
                  "Early access to premieres",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-white/85">{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-2 text-white/50 text-xs">
                <PlayCircle className="w-4 h-4 text-white" />
                <span>Watch a 30-second tour →</span>
              </div>
            </motion.div>

            <p className="text-xs text-white/40 tracking-wide">
              © {new Date().getFullYear()} Movies OK — a cinematic editorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase mb-2">
        {label}
      </p>
      <div className="relative">{children}</div>
    </div>
  );
}
