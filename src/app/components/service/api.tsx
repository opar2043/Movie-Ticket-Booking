import axios from "axios";

const api = axios.create({
  baseURL: "https://moviebackend-eta.vercel.app/api",
  withCredentials: true,
});

export default api;