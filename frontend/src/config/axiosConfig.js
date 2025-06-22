import _axios from "axios";

const axios = _axios.create({
  baseURL: "https://watchbuddy-vgpp.onrender.com",
  headers: { "Content-Type": "application/json" },
});
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("chung-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axios;
