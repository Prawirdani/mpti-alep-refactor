import { z } from 'zod';

export const karyawanCreateSchema = z.object({
  nama: z.string(),
  handphone: z.string(),
});
export type KaryawanCreateSchema = z.infer<typeof karyawanCreateSchema>;

export const karyawanUpdateSchema = z.object({
  nama: z.string(),
  handphone: z.string(),
});

export type KaryawanUpdateSchema = z.infer<typeof karyawanUpdateSchema>;
