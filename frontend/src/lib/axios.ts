import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://journey-pg6s.vercel.app',
  // Outros parâmetros, se necessário
});

export default api;
