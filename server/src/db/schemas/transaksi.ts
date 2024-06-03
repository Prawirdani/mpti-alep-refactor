import { relations, sql } from 'drizzle-orm';
import { varchar, timestamp, mysqlTable, int, mysqlEnum } from 'drizzle-orm/mysql-core';
import { paket } from './paket';
import { karyawan } from './karyawan';

export const transaksi = mysqlTable('transaksi', {
  id: int('id').autoincrement().primaryKey(),
  nama_customer: varchar('nama_customer', { length: 100 }),
  no_hp: varchar('no_hp', { length: 30 }),
  paket_id: int('paket_id')
    .notNull()
    .references(() => paket.id),
  karyawan_id: int('karyawan_id')
    .notNull()
    .references(() => karyawan.id),
  status: mysqlEnum('status', ['booking', 'proses', 'selesai', 'batal'])
    .default('proses')
    .notNull(),
  total_harga: int('total').notNull(),
  jadwal_booking: timestamp('jadwal_booking'),
  waktu_transaksi: timestamp('waktu_transaksi').defaultNow(),
});

export const transaksiRelations = relations(transaksi, ({ many }) => ({
  paket: many(paket),
  karyawan: many(karyawan),
}));

export const paketRelations = relations(paket, ({ one }) => ({
  transaksi: one(transaksi, {
    fields: [paket.id],
    references: [transaksi.paket_id],
  }),
}));

export const karyawanRelations = relations(karyawan, ({ one }) => ({
  transaksi: one(transaksi, {
    fields: [karyawan.id],
    references: [transaksi.karyawan_id],
  }),
}));
