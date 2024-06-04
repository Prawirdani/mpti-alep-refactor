import db from '.';
import bcrypt from 'bcrypt';
import { users } from './schemas/users';
import { paket } from './schemas/paket';
import { karyawan } from './schemas/karyawan';
import { transaksi } from './schemas/transaksi';

async function seeders() {
  async function user_seed() {
    try {
      await db.insert(users).values({
        nama: 'John Doe',
        username: 'doe',
        password: await bcrypt.hash('123456', 10),
        role: 'admin',
      });
    } catch (error) {
      throw new Error(`failed to run user seed: ${error}`);
    }
  }

  async function paket_seed() {
    try {
      await db.insert(paket).values({
        nama: 'Paket A',
        harga: 100000,
        deskripsi: 'Paket ini bla bla bla bla.',
      });
    } catch (error) {
      throw new Error(`failed to run paket seed: ${error}`);
    }
  }

  async function karyawan_seed() {
    try {
      await db.insert(karyawan).values({
        nama: 'Karyawan A',
        handphone: '081234567890',
      });
    } catch (error) {
      throw new Error(`failed to run karyawan seed: ${error}`);
    }
  }

  async function transaksi_seed() {
    try {
      await db.insert(transaksi).values({
        nama_customer: 'Customer A',
        no_hp: '081234567890',
        total_harga: 100000,
        paket_id: 1,
        karyawan_id: 1,
      });
    } catch (error) {
      throw new Error(`failed to run transaksi seed: ${error}`);
    }
  }

  return {
    user_seed,
    paket_seed,
    karyawan_seed,
    transaksi_seed,
  };
}

(async () => {
  try {
    const { user_seed, paket_seed, karyawan_seed, transaksi_seed } = await seeders();
    console.log('Running seed...');
    await Promise.all([user_seed(), paket_seed(), karyawan_seed(), transaksi_seed()]);
    console.log('Seed completed!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
