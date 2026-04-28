'use client'
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";
import Swal from "sweetalert2";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams.get("redirect") || "/dashboard/admin";

  async function loginAction(e : any){
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const users ={
      email,
      password
    }
     console.log(users)

     try {
      const { data, error } = await authClient.signIn.email({
        email: users.email,
        password: users.password,
        callbackURL: "/login"
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: error.message || "Failed to sign in",
          background: "#141414",
          color: "#141414"
        });
        return;
      }
      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "User Login successfully",
        background: "#141414",
        color: "#141414",
        timer: 1500,
        showConfirmButton: false
      });
      router.push(redirectParams);
     } catch (error : any) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message || "Something went wrong",
        background: "#141414",
        color: "#141414"
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
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="name@example.com" 
              className="w-full px-3 py-2 bg-[#2B2B2B] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
            </div>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-3 py-2 bg-[#2B2B2B] border border-[#2B2B2B] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          {/* Submit Button */}
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
  )
}

