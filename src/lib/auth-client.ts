import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://moviebackend-eta.vercel.app", // backend URL
});

export const { signIn, signUp, useSession, signOut } = authClient;
