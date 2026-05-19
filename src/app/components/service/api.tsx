import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://moviebackend-eta.vercel.app/api",
  withCredentials: true,
});

export default api;