import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { queryClient } from './QueryProvider';
import { navigate } from './navigation';

interface ApiError {
  errorCode?: string;
  message: string;
}

const options: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const tokenRefreshClient: AxiosInstance = axios.create(options);
tokenRefreshClient.interceptors.response.use((response) => response.data);

const apiClient: AxiosInstance = axios.create(options);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const { config, response } = error;
    const status = response?.status;
    const data = response?.data;

    if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
      try {
        await tokenRefreshClient.get('/auth/refresh');
        return apiClient(config as AxiosRequestConfig);
      } catch (refreshError) {
        // Log the refresh error for debugging purposes
        console.error('Token refresh failed:', refreshError);
        queryClient.clear();
        navigate('/login', {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    // Construct and return a consistent error object
    const errorResponse: ApiError & { status?: number } = {
      status,
      ...(data || { message: 'An unknown error occurred' }),
    };

    return Promise.reject(errorResponse);
  }
);

export { apiClient };
