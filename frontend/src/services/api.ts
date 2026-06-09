import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 60000, // 60s para aguardar o Render acordar no plano gratuito
});

export default api;
