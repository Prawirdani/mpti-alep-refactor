import {
  KaryawanCreateSchema,
  KaryawanUpdateSchema,
  karyawanCreateSchema,
  karyawanUpdateSchema,
} from '../schemas/karyawan_schemas';
import { Router, NextFunction, Request, Response } from 'express';
import { MakeResponse } from '../utils/response';
import { AuthAccessToken } from './middleware/authenticate';
import { validateRequest } from '../utils/validator';
import { ErrNotFound } from '../utils/error';
import { karyawan } from '../db/schemas/karyawan';
import { eq } from 'drizzle-orm';
import db from '../db';

const karyawanRoute = Router();
karyawanRoute.get('/karyawan', getKaryawan);
karyawanRoute.post('/karyawan', AuthAccessToken, createKaryawan);
karyawanRoute.put('/karyawan/:id', AuthAccessToken, updateKaryawan);
karyawanRoute.delete('/karyawan/:id', AuthAccessToken, deleteKaryawan);
export default karyawanRoute;

async function getKaryawan(req: Request, res: Response, next: NextFunction) {
  try {
    const karyawanList = await db.query.karyawan.findMany({
      where: eq(karyawan.deleted, false),
    });
    res.status(200).json(MakeResponse(karyawanList));
  } catch (error) {
    next(error);
  }
}

async function createKaryawan(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(karyawanCreateSchema, req.body);
    const request = req.body as KaryawanCreateSchema;

    const insert = await db.insert(karyawan).values({
      nama: request.nama,
      handphone: request.handphone,
    });

    const karyawanData = await db.query.karyawan.findFirst({
      where: eq(karyawan.id, insert[0].insertId),
    });

    res.status(201).json(MakeResponse(karyawanData, 'Berhasil menambahkan karyawan!'));
  } catch (error) {
    next(error);
  }
}

async function updateKaryawan(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    validateRequest(karyawanUpdateSchema, req.body);
    const request = req.body as KaryawanUpdateSchema;

    const karyawanData = await db.query.karyawan.findFirst({
      where: eq(karyawan.id, Number(id)),
    });

    if (!karyawanData) {
      throw ErrNotFound('Karyawan tidak ditemukan!');
    }

    await db
      .update(karyawan)
      .set(request)
      .where(eq(karyawan.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil update data karyawan!'));
  } catch (error) {
    next(error);
  }
}

async function deleteKaryawan(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const karyawanData = await db.query.karyawan.findFirst({
      where: eq(karyawan.id, Number(id)),
    });

    if (!karyawanData) {
      throw ErrNotFound('Karyawan tidak ditemukan!');
    }

    await db
      .update(karyawan)
      .set({ deleted: true })
      .where(eq(karyawan.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil hapus karyawan!'));
  } catch (error) {
    next(error);
  }
}
