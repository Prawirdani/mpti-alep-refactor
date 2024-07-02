import { z } from 'zod';

export const authRegisterSchema = z.object({
  nama: z.string(),
  username: z.string(),
  password: z.string().min(6),
});
export type AuthRegisterSchema = z.infer<typeof authRegisterSchema>;

export const authLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AuthLoginSchema = z.infer<typeof authLoginSchema>;
