import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hotels-api-production.up.railway.app/api/',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
