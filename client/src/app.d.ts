// app.d.ts
declare global {
  type UserRole = 'admin' | 'operator';

  type AuthUser = {
    id: number;
    nama: string;
    username: string;
    role: UserRole;
  };

  type Karyawan = {
    id: number;
    nama: string;
    handphone: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
  };

  type Paket = {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
    created_at: string;
    updated_at: string;
    deleted: boolean;
  };

  type Transaksi = {
    id: number;
    nama_customer: string;
    no_hp: string;
    paket_id: number;
    karyawan_id: number;
    status: string;
    total_harga: number;
    jadwal_booking: string;
    waktu_transaksi: string;
    karyawan: Karyawan;
    paket: Paket;
  };
}

export {};
