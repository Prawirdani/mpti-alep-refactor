import { z } from 'zod';

// Create or Update Karyawan schema
export const karyawanSchema = z.object({
  nama: z.string().min(1, { message: 'Masukkan nama karyawan' }),
  handphone: z.string().min(1, { message: 'Masukkan nomor handphone' }),
});

export type KaryawanSchema = z.infer<typeof karyawanSchema>;
