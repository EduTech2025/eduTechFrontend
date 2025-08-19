// lib/api.ts
import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/' || 'http://localhost:8000/',
  baseURL: 'https://desilentorder.in/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

