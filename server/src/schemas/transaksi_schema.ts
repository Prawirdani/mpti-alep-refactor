import { z } from 'zod';

export const transaksiCreateSchema = z.object({
  nama_customer: z.string(),
  no_hp: z.string(),
  paket_id: z.number(),
  karyawan_id: z.number(),
});

export type TransaksiCreateSchema = z.infer<typeof transaksiCreateSchema>;

export const transaksiBookingSchema = z.object({
  nama_customer: z.string(),
  no_hp: z.string(),
  paket_id: z.number(),
  karyawan_id: z.number(),
  jadwal_booking: z.string(),
});

export type TransaksiBookingSchema = z.infer<typeof transaksiBookingSchema>;
