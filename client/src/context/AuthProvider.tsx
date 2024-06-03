import { Fetch } from '@/lib/fetcher';
import { LoginFormSchema } from '@/lib/schemas/auth';
import { createContext, useState } from 'react';

type AuthContextType = {
	user: AuthUser;
	isAuthenticated: boolean;
	login: (data: LoginFormSchema) => Promise<Response>;
	identify: () => Promise<void>;
	logout: () => Promise<void>;
};

export const AuthCtx = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser>({} as AuthUser);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = async (data: LoginFormSchema) => {
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		});
		return res;
	};

	const logout = async () => {
		await fetch('/api/auth/logout', {
			method: 'DELETE',
			credentials: 'include',
		});
		setIsAuthenticated(false);
		setUser({} as AuthUser);
	};

	const identify = async () => {
		const res = await Fetch('/api/auth/current', {
			method: 'GET',
			credentials: 'include',
		});
		if (res.ok) {
			const resBody = (await res.json()) as { data: AuthUser };
			setIsAuthenticated(true);
			setUser(resBody.data);
		}
	};

	return (
		<AuthCtx.Provider value={{ user, isAuthenticated, login, identify, logout }}>
			<>{children}</>
		</AuthCtx.Provider>
	);
}
