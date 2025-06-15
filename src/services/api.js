import axios from 'axios';

const API = axios.create({
  baseURL: 'https://store-rating-app-backend.onrender.com/api',
  withCredentials: true, // optional: if you're using cookies or sessions
});

export default API;
