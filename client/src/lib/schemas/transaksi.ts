import { z } from 'zod';

export const transaksiCreateSchema = z.object({
  namaCustomer: z.string().min(1, { message: 'Masukkan nama customer' }),
  noHp: z.string().min(1, { message: 'Masukkan nomor HP Customer' }),
  paketId: z.string().min(1, { message: 'Pilih paket' }),
  karyawanId: z.string().min(1, { message: 'Pilih karyawan' }),
});

export type TransaksiCreateSchema = z.infer<typeof transaksiCreateSchema>;

export const transaksiBookingSchema = z.object({
  namaCustomer: z.string().min(1, { message: 'Masukkan nama Anda' }),
  noHp: z.string().min(1, { message: 'Masukkan nomor HP' }),
  paketId: z.string().min(1, { message: 'Pilih paket' }),
  karyawanId: z.string().min(1, { message: 'Pilih pemangkas' }),
  jadwalBooking: z.date({ required_error: 'Tentukan jadwal kedatangan' }),
});

export type TransaksiBookingSchema = z.infer<typeof transaksiBookingSchema>;
