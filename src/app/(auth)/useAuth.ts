"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import auth from "./firebase.config";
import api from "@/src/app/components/service/api";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type AppUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
  image?: string | null;
};

let cachedUser: AppUser | null = null;
let cachedFbUid: string | null = null;

export function normalizeRole(value: unknown): UserRole {
  const r = String(value ?? "").trim().toUpperCase();
  return r === "ADMIN" ? UserRole.ADMIN : UserRole.USER;
}

export async function fetchDbUserByEmail(email: string): Promise<AppUser | null> {
  const res = await api.get("/users");
  const list = res.data?.data ?? res.data ?? [];
  if (!Array.isArray(list)) return null;
  const match = list.find((u: any) => u.email === email);
  if (!match) return null;
  return {
    id: match.id,
    name: match.name ?? null,
    email: match.email ?? email,
    role: normalizeRole(match.role),
    image: match.image ?? null,
  };
}

async function resolveDbUser(fbUser: FirebaseUser): Promise<AppUser | null> {
  if (cachedUser && cachedFbUid === fbUser.uid) return cachedUser;
  if (!fbUser.email) return null;

  const dbUser = await fetchDbUserByEmail(fbUser.email);
  if (!dbUser) return null;

  cachedUser = dbUser;
  cachedFbUid = fbUser.uid;
  return dbUser;
}

export function redirectPathForRole(role: UserRole | string | undefined): string {
  return normalizeRole(role) === UserRole.ADMIN
    ? "/dashboard/admin"
    : "/dashboard/user/reviews";
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(cachedUser);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        cachedUser = null;
        cachedFbUid = null;
        setUser(null);
        setIsPending(false);
        return;
      }
      try {
        const dbUser = await resolveDbUser(fbUser);
        setUser(dbUser);
      } catch {
        setUser(null);
      } finally {
        setIsPending(false);
      }
    });
    return () => unsub();
  }, []);

  return { user, isPending };
}

export function useSession() {
  const { user, isPending } = useAuth();
  return {
    data: user ? { user } : null,
    isPending,
  };
}

export async function signOut() {
  cachedUser = null;
  cachedFbUid = null;
  await firebaseSignOut(auth);
}
