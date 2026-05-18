import axios from "axios";

// AUTO DETECT HOST
const hostname = window.location.hostname;

// DYNAMIC BASE URL
export const BASE_URL =
  hostname === "localhost"
    ? "http://localhost:5000"
    : `http://${hostname}:5000`;

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // PREVENT CACHING
  if (req.method?.toLowerCase() === "get") {

    req.params = {
      ...req.params,
      _t: Date.now(),
    };
  }

  return req;
});

export default API;