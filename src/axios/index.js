import axios from 'axios';

const ax = axios.create({
  baseURL: 'https://api-car-rental.marek-galganski.pl/public/api/',
});

ax.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default ax;
