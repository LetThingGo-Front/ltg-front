import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default axios.create({
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL ?? "",
  },
  withCredentials: true,
});

export const axiosAuth = axios.create({
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL ?? "",
  },
  withCredentials: true,
});
