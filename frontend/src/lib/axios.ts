// src/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backendtripon-1.onrender.com', // URL direta
});
