import { authApi } from './api';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: string;
}

export const authService = {
  signIn: (email: string, password: string) =>
    authApi.post('/auth/signin', { email, password }),
  
  signUp: (email: string, password: string) =>
    authApi.post('/auth/signup', { email, password }),

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await authApi.get<AuthResponse['user']>('/auth/current-user');
    return response.data;
  }
}; 