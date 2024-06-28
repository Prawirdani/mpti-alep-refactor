import { Fetch } from '@/lib/fetcher';
import { UserRegisterSchema, UserResetPasswordSchema, UserUpdateSchema } from '@/lib/schemas/user';
import { createContext, useState } from 'react';

type UserContextType = {
  listUsers: User[];
  fetchUsers: () => Promise<void>;
  invalidate: () => Promise<void>;
  registerUser: (data: UserRegisterSchema) => Promise<Response>;
  resetPassword: (id: number, data: UserResetPasswordSchema) => Promise<Response>;
  updateUser: (id: number, data: UserUpdateSchema) => Promise<Response>;
  deleteUser: (id: number) => Promise<Response>;
};

export const UserCtx = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [listUsers, setListUsers] = useState<User[]>([]);

  async function fetchUsers() {
    const res = await Fetch('/api/users', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      const resBody = (await res.json()) as { data: User[] };
      setListUsers(resBody.data);
    }
  }

  async function invalidate() {
    await fetchUsers();
  }

  async function registerUser(data: UserRegisterSchema) {
    return await Fetch('/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function resetPassword(id: number, data: UserResetPasswordSchema) {
    return await Fetch(`/api/users/${id}/reset-password`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function updateUser(id: number, data: UserUpdateSchema) {
    return await Fetch(`/api/users/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async function deleteUser(id: number) {
    return await Fetch(`/api/users/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  }

  return (
    <UserCtx.Provider
      value={{ listUsers, fetchUsers, invalidate, registerUser, resetPassword, updateUser, deleteUser }}
    >
      <>{children}</>
    </UserCtx.Provider>
  );
}
