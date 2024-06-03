import { varchar, timestamp, mysqlTable, int } from 'drizzle-orm/mysql-core';

export const karyawan = mysqlTable('karyawan', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 100 }),
  handphone: varchar('handphone', { length: 30 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
