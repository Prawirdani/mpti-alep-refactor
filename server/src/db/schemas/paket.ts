import { varchar, timestamp, mysqlTable, int, text } from 'drizzle-orm/mysql-core';

export const paket = mysqlTable('paket', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 100 }),
  deskripsi: text('deskripsi'),
  harga: int('harga'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
