import { apiClient } from './apiClient';

interface LoginData {
  email: string;
  password: string;
}
export const login = async (data: LoginData) => {
  return await apiClient.post('/auth/login', data);
};
