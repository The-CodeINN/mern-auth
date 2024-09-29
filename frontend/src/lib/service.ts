import { apiClient } from './apiClient';

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse {
  message: string;
}

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

export interface User {
  _id: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  _id: string;
  userAgent: string;
  createdAt: string;
  isCurrent?: boolean;
}

const createApiError = (message: string, status: number): ApiError => {
  return { message, status };
};

const handleApiError = (error: ApiError): never => {
  // console.error(error);
  if (error.message) {
    const status = error.status || 500;
    const message =
      error.message || 'An unexpected error occurred. Please try again.';

    const apiError = createApiError(message, status);
    throw apiError;
  }

  throw createApiError('An unexpected error occurred', 500);
};

export const login = async (data: LoginData): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/auth/login', data);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await apiClient.post<User>('/auth/register', data);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const verifyEmail = async (code: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>(
      `/auth/email/verify/${code}`
    );
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const sendPasswordResetEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/auth/password/forgot',
      { email }
    );
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const resetPassword = async (
  data: ResetPasswordData
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>(
      '/auth/password/reset',
      data
    );
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>('/user');
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const logout = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>('/auth/logout');
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const getSessions = async (): Promise<Session[]> => {
  try {
    const response = await apiClient.get<Session[]>('/sessions');
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};

export const deleteSession = async (
  sessionId: string
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.delete<ApiResponse>(
      `/sessions/${sessionId}`
    );
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error as ApiError);
  }
};
