import axios from 'axios';

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const apiClient = axios.create(options);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;
    return Promise.reject({ status, ...data });
  }
);

export { apiClient };
