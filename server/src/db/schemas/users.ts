import { varchar, timestamp, mysqlTable, mysqlEnum, int, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  nama: varchar('nama', { length: 100 }),
  username: varchar('username', { length: 100 }).unique(),
  password: varchar('password', { length: 256 }),
  role: mysqlEnum('role', ['admin', 'operator']).default('operator'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  deleted: boolean('deleted').default(false),
});
