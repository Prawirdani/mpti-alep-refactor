import { Router, NextFunction, Request, Response } from 'express';
import db from '../db';
import { transaksi } from '../db/schemas/transaksi';
import { and, count, eq, gte, sum } from 'drizzle-orm';
import { MakeResponse } from '../utils/response';
import { AuthAccessToken } from './middleware/authenticate';

const statsRoute = Router();
statsRoute.get('/stats', AuthAccessToken, getStats);
export default statsRoute;

async function getStats(req: Request, res: Response, next: NextFunction) {
  try {
    const [bookCount, todayOrdersCount, todayRevenue] = await Promise.all([
      getBookCount(),
      getTodayOrdersCount(),
      getTodayRevenue(),
    ]);

    const resp = MakeResponse({
      bookCount,
      todayOrdersCount,
      todayRevenue,
    });

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
}
async function getBookCount() {
  const c = await db
    .select({ count: count() })
    .from(transaksi)
    .where(eq(transaksi.status, 'booking'));
  return c[0].count;
}

async function getTodayOrdersCount() {
  const currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  const c = await db
    .select({ count: count() })
    .from(transaksi)
    .where(and(eq(transaksi.status, 'selesai'), gte(transaksi.waktu_transaksi, currDate)));

  return c[0].count;
}

async function getTodayRevenue() {
  const currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  const sums = await db
    .select({ value: sum(transaksi.total_harga) })
    .from(transaksi)
    .where(and(eq(transaksi.status, 'selesai'), gte(transaksi.waktu_transaksi, currDate)));

  return sums[0].value;
}
