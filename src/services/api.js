import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000/api', // Replace with your backend URL later
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  // headers: { 'Content-Type': 'multipart/form-data' },
});

export default api;