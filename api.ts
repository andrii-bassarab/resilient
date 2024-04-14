import { BASE_URL } from '@/constants';
import axiosInstance from 'axios';

// Create an Axios instance with a base URL
const axios = axiosInstance.create({
  baseURL: BASE_URL,
});

export default axios;
