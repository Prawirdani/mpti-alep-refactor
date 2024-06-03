import { Router, NextFunction, Request, Response } from 'express';
import { MakeResponse } from '../utils/response';
import { AuthAccessToken } from './middleware/authenticate';
import { validateRequest } from '../utils/validator';
import { ErrNotFound } from '../utils/error';
import { eq } from 'drizzle-orm';
import db from '../db';
import { paket } from '../db/schemas/paket';
import { PaketSchema, paketSchema } from '../schemas/paket_schema';

const paketRoute = Router();
paketRoute.get('/paket', getPaket);
paketRoute.post('/paket', AuthAccessToken, createPaket);
paketRoute.put('/paket/:id', AuthAccessToken, updatePaket);
paketRoute.delete('/paket/:id', AuthAccessToken, deletePaket);
export default paketRoute;

async function getPaket(req: Request, res: Response, next: NextFunction) {
  try {
    const paketList = await db.query.paket.findMany({
      where: eq(paket.deleted, false),
    });
    res.status(200).json(MakeResponse(paketList));
  } catch (error) {
    next(error);
  }
}

async function createPaket(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(paketSchema, req.body);
    const request = req.body as PaketSchema;

    const insert = await db.insert(paket).values({
      ...request,
    });

    const paketData = await db.query.paket.findFirst({
      where: eq(paket.id, insert[0].insertId),
    });

    res.status(201).json(MakeResponse(paketData, 'Berhasil menambahkan paket!'));
  } catch (error) {
    next(error);
  }
}

async function updatePaket(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    validateRequest(paketSchema, req.body);
    const request = req.body as PaketSchema;

    const paketData = await db.query.karyawan.findFirst({
      where: eq(paket.id, Number(id)),
    });

    if (!paketData) {
      throw ErrNotFound('Paket tidak ditemukan!');
    }

    await db
      .update(paket)
      .set({
        ...request,
        updated_at: new Date(),
      })
      .where(eq(paket.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil update data paket!'));
  } catch (error) {
    next(error);
  }
}

async function deletePaket(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const paketData = await db.query.paket.findFirst({
      where: eq(paket.id, Number(id)),
    });

    if (!paketData) {
      throw ErrNotFound('Paket tidak ditemukan!');
    }

    await db
      .update(paket)
      .set({ deleted: true })
      .where(eq(paket.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil hapus data paket!'));
  } catch (error) {
    next(error);
  }
}
