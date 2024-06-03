import { z } from 'zod';

export const paketSchema = z.object({
  nama: z.string(),
  deskripsi: z.string(),
  harga: z.number().min(1),
});
export type PaketSchema = z.infer<typeof paketSchema>;
