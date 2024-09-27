import { apiClient } from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  confirmPassword: string;
}

interface ResetPasswordData {
  password: string;
  verificationCode: string;
}

export const login = (data: LoginData) => apiClient.post('/auth/login', data);

export const register = (data: RegisterData) =>
  apiClient.post('/auth/register', data);

export const verifyEmail = (code: string) =>
  apiClient.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = (email: string) =>
  apiClient.post('/auth/password/forgot', { email });

export const resetPassword = (data: ResetPasswordData) =>
  apiClient.post('/auth/password/reset', data);
