import { varchar, timestamp, mysqlTable, int, boolean } from 'drizzle-orm/mysql-core';

export const karyawan = mysqlTable('karyawan', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 100 }),
  handphone: varchar('handphone', { length: 30 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted: boolean('deleted').default(false),
});
