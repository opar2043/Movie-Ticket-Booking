"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/src/app/(auth)/firebase.config";
import {
  fetchDbUserByEmail,
  redirectPathForRole,
} from "@/src/app/(auth)/useAuth";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowUpRight,
  Loader2,
  Sparkles,
  Ticket,
  ShieldCheck,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loginAction(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const dbUser = await fetchDbUserByEmail(email);
      const target = redirectPathForRole(dbUser?.role);
      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "You're signed in.",
        background: "#23262B",
        color: "#ffffff",
        timer: 1400,
        showConfirmButton: false,
      });
      router.push(target);
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Sign-in failed",
        text: error?.message || "Something went wrong",
        background: "#23262B",
        color: "#ffffff",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121315] text-white">
      <div className="max-w-[1400px] mx-auto min-h-screen grid lg:grid-cols-2 gap-6 px-5 sm:px-8 py-8">
        {/* LEFT — Cinematic panel */}
        <div className="relative hidden lg:block rounded-[2rem] overflow-hidden border border-white/8 luxury-shadow">
          <img
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#121315] via-[#121315]/70 to-[#121315]/20" />

          <div className="relative h-full flex flex-col justify-between p-10">
            <Link href="/" className="flex items-center gap-3 group w-fit">
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
                Members Only
              </span>
              <h2
                className="text-white font-light leading-[1] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              >
                Your seat is{" "}
                <span className="italic font-serif text-white/80">
                  waiting for you.
                </span>
              </h2>
              <p className="text-white/70 mt-5 leading-relaxed">
                Sign in to book tickets in seconds, save favourites, leave
                honest reviews and unlock member-only previews.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { icon: <Ticket className="w-3.5 h-3.5" />, label: "8.4M Tickets" },
                  { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Secure Pay" },
                  { icon: <Sparkles className="w-3.5 h-3.5" />, label: "57 Awards" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="glass rounded-2xl p-4"
                  >
                    <span className="text-white inline-flex">{b.icon}</span>
                    <p className="text-xs text-white/80 mt-2 font-medium">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="text-xs text-white/40 tracking-wide">
              © {new Date().getFullYear()} Movies OK — a cinematic editorial.
            </p>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="flex items-center justify-center rounded-[2rem] border border-white/8 bg-[#23262B] p-8 sm:p-14">
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
              Sign in
            </p>
            <h1
              className="text-white font-light leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Welcome back,{" "}
              <span className="italic font-serif text-white/80">cinephile.</span>
            </h1>
            <p className="text-white/55 mt-3">
              Continue where you left off — your favourites are waiting.
            </p>

            <form onSubmit={loginAction} className="mt-8 space-y-4">
              <FieldLabel label="Email">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl focus:outline-none focus:border-white/30 transition-all"
                />
              </FieldLabel>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-white/45 tracking-[0.35em] uppercase">
                    Password
                  </p>
                  <Link
                    href="#"
                    className="text-xs text-white/65 hover:text-white"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
                  <input
                    name="password"
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 bg-[#121315] border border-white/8 text-white placeholder:text-white/35 rounded-2xl focus:outline-none focus:border-white/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black hover:text-black/80 transition-colors"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-white rounded-sm"
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-transform shadow-[0_14px_30px_-8px_rgba(255,255,255,0.25)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* <div className="my-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#121315] border border-white/8 hover:border-white/20 text-white/75 hover:text-white text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#121315] border border-white/8 hover:border-white/20 text-white/75 hover:text-white text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Apple
              </button>
            </div> */}

            <p className="mt-8 text-center text-sm text-white/55">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-white font-medium hover:underline underline-offset-4"
              >
                Create one
              </Link>
            </p>
          </motion.div>
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121315] flex justify-center items-center text-white">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
