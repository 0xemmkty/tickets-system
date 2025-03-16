import { authApi } from './api';

interface User {
  id: number;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string;
}

export const usersService = {
  getAllUsers: () =>
    authApi.get<User[]>('/admin/users'),

  updateUserRole: (userId: number, role: string) =>
    authApi.patch<User>(`/admin/users/${userId}/role`, { role }),

  updateUserStatus: (userId: number, status: string) =>
    authApi.patch<User>(`/admin/users/${userId}/status`, { status }),

  deleteUser: (userId: number) =>
    authApi.delete(`/admin/users/${userId}`)
}; 