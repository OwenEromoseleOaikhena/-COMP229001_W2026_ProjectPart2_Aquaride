import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://comp229001-w2026-projectpart2-aquaride.onrender.com',
});

// Attach JWT token to every request automatically
instance.interceptors.request.use((config) => {
  const user = localStorage.getItem('aquaride_user');
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

export default instance;
