// app.d.ts
declare global {
	type UserRole = 'admin' | 'operator';

	type AuthUser = {
		id: number;
		nama: string;
		username: string;
		role: UserRole;
	};
}

export { };
