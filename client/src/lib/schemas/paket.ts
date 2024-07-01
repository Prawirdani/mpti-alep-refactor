import { z } from 'zod';

// Add or Update paket form schema
export const paketSchema = z.object({
  nama: z.string().min(1, { message: 'Masukkan nama paket' }),
  deskripsi: z.string().min(1, { message: 'Masukkan deskripsi paket' }),
  harga: z.number().int().min(1, { message: 'Masukkan harga paket' }),
});

export type PaketSchema = z.infer<typeof paketSchema>;
