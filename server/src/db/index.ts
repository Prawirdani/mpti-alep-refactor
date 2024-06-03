import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2';
import { users } from './schemas/users';

const connection = mysql.createConnection({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'test',
  port: Number(process.env.DB_PORT) ?? 3306,
});

const db = drizzle(connection, { schema: { users }, mode: 'default' });
export default db;
