import { z } from 'zod';

export const transaksiCreateSchema = z.object({
  namaCustomer: z.string().min(1, { message: 'Masukkan nama customer' }),
  noHp: z.string().min(1, { message: 'Masukkan nomor HP Customer' }),
  paketId: z.string().min(1, { message: 'Pilih paket' }),
  karyawanId: z.string().min(1, { message: 'Pilih karyawan' }),
});

export type TransaksiCreateSchema = z.infer<typeof transaksiCreateSchema>;

export const transaksiBookingSchema = z.object({
  nama_customer: z.string(),
  no_hp: z.string(),
  paket_id: z.string(),
  karyawan_id: z.string(),
  jadwal_booking: z.string(),
});

export type TransaksiBookingSchema = z.infer<typeof transaksiBookingSchema>;
