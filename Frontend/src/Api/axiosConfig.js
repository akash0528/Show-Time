import axios from "axios";

// Production + fallback for local dev
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.withCredentials = true; // cookies ke liye

export default axios;