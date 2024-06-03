import { varchar, timestamp, mysqlTable, int, text, boolean } from 'drizzle-orm/mysql-core';

export const paket = mysqlTable('paket', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 100 }),
  deskripsi: text('deskripsi'),
  harga: int('harga'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted: boolean('deleted').default(false),
});
