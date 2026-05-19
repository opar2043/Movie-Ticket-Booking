'use client'
import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/src/app/(auth)/firebase.config";
import {
  fetchDbUserByEmail,
  redirectPathForRole,
} from "@/src/app/(auth)/useAuth";
import Swal from "sweetalert2";

function LoginForm() {
  const router = useRouter();

  async function loginAction(e: any) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const dbUser = await fetchDbUserByEmail(email);
      const target = redirectPathForRole(dbUser?.role);

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "User Login successfully",
        background: "#141414",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push(target);
      router.refresh();
    } catch (error: any) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "Something went wrong",
        background: "#141414",
        color: "#ffffff",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#141414] border border-[#2B2B2B] rounded-sm p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your CineVerse account.</p>
        </div>

        <form onSubmit={loginAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input
              name="email"
              type="text"
              placeholder="name@example.com"
              className="w-full px-3 py-2 bg-[#2B2B2B] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#2B2B2B] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-medium py-2.5 rounded-sm transition-colors flex justify-center items-center mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#E50914] hover:text-red-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
