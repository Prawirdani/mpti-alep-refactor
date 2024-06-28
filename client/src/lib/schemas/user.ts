import { z } from 'zod';

export const userRegisterSchema = z
  .object({
    nama: z.string().min(1, { message: 'Masukkan nama pengguna' }),
    username: z.string().min(1, { message: 'Masukkan username pengguna' }),
    password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
    repeatPassword: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Password tidak sama.',
    path: ['repeatPassword'],
  });

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export const userUpdateSchema = z.object({
  nama: z.string().min(1, { message: 'Masukkan nama pengguna' }),
  username: z.string().min(1, { message: 'Masukkan username' }),
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export const userResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, { message: 'Password minimal 6 karakter' }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Password tidak sama.',
    path: ['repeatPassword'],
  });

export type UserResetPasswordSchema = z.infer<typeof userResetPasswordSchema>;
