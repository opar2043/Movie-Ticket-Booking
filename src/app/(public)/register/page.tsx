'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
  const router = useRouter();

  async function registerAction(e: any) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (cred.user && name) {
        await updateProfile(cred.user, { displayName: name });
      }

      await api.post("/users", { name, email, role: UserRole.USER });

      const dbUser = await fetchDbUserByEmail(email);
      const target = redirectPathForRole(dbUser?.role);

      toast.success("User registered successfully");
      router.push(target);
      router.refresh();
    } catch (error: any) {
      console.error("Register error:", error);
      toast.error(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#141414] border border-[#2B2B2B] rounded-sm p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Create an account</h1>
          <p className="text-gray-400">Enter your info to join the CineVerse.</p>
        </div>

        <form onSubmit={registerAction} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Name</label>
            <input
              name="name"
              placeholder="John Doe"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input
              name="email"
              type="text"
              placeholder="name@example.com"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#000000] border border-[#2B2B2B] text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent rounded-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E50914] hover:bg-red-700 text-white font-medium py-2.5 rounded-sm transition-colors flex justify-center items-center mt-6"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#E50914] hover:text-red-400 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
