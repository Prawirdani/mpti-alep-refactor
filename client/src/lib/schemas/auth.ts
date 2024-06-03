import { z } from 'zod';

export const loginFormSchema = z.object({
	username: z.string().min(1, { message: 'Mohon isi kolom username' }),
	password: z.string().min(1, { message: 'Mohon isi kolom password' }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
