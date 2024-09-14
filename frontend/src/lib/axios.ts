import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.MODE === 'production' 
    ? 'https://journey-chi-ten.vercel.app' 
    : 'http://localhost:3333'
});
