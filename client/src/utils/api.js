import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5',
});

export default api;
