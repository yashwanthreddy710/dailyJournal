import axios from "axios";

const API = axios.create({
  baseURL: "https://dailyjournal-xkgo.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
