import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://journey-chi-ten.vercel.app'
})