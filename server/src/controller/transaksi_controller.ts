import {
  TransaksiBookingSchema,
  TransaksiCreateSchema,
  transaksiBookingSchema,
  transaksiCreateSchema,
} from '../schemas/transaksi_schema';
import { Router, NextFunction, Request, Response } from 'express';
import { MakeResponse } from '../utils/response';
import { AuthAccessToken } from './middleware/authenticate';
import { validateRequest } from '../utils/validator';
import { ErrNotFound } from '../utils/error';
import { transaksi } from '../db/schemas/transaksi';
import { karyawan } from '../db/schemas/karyawan';
import { paket } from '../db/schemas/paket';
import { asc, eq, getTableColumns } from 'drizzle-orm';
import db from '../db';
import ExcelJS from 'exceljs';

const transaksiRoute = Router();
transaksiRoute.get('/transaksi', AuthAccessToken, getTransaksi);
transaksiRoute.post('/transaksi', AuthAccessToken, createTransaksi);
transaksiRoute.post('/transaksi/booking', createTransaksiBooking);
transaksiRoute.post('/transaksi/:id/booking/process', AuthAccessToken, processTransaksiBooking);
transaksiRoute.post('/transaksi/:id/complete', AuthAccessToken, completeTransaksi);
transaksiRoute.post('/transaksi/:id/cancel', AuthAccessToken, cancelTransaksi);
transaksiRoute.get('/transaksi/report', AuthAccessToken, report);
export default transaksiRoute;

async function getTransaksi(req: Request, res: Response, next: NextFunction) {
  try {
    const transaksiList = await db
      .select({
        ...getTableColumns(transaksi),
        karyawan: { ...getTableColumns(karyawan) },
        paket: { ...getTableColumns(paket) },
      })
      .from(transaksi)
      .orderBy(asc(transaksi.status))
      .innerJoin(karyawan, eq(karyawan.id, transaksi.karyawan_id))
      .innerJoin(paket, eq(paket.id, transaksi.paket_id));

    res.status(200).json(MakeResponse(transaksiList));
  } catch (error) {
    next(error);
  }
}

async function createTransaksi(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(transaksiCreateSchema, req.body);
    const request = req.body as TransaksiCreateSchema;

    const paketData = await db.query.paket.findFirst({
      where: eq(paket.id, request.paket_id),
    });

    if (!paketData) {
      throw ErrNotFound('Paket tidak ditemukan!');
    }

    const karyawanData = await db.query.karyawan.findFirst({
      where: eq(karyawan.id, request.karyawan_id),
    });

    if (!karyawanData) {
      throw ErrNotFound('Karyawan tidak ditemukan!');
    }

    const insert = await db.insert(transaksi).values({
      ...request,
      total_harga: paketData.harga!,
    });

    const transaksiData = await db
      .select({
        ...getTableColumns(transaksi),
        karyawan: { ...getTableColumns(karyawan) },
        paket: { ...getTableColumns(paket) },
      })
      .from(transaksi)
      .innerJoin(karyawan, eq(karyawan.id, transaksi.karyawan_id))
      .innerJoin(paket, eq(paket.id, transaksi.paket_id))
      .where(eq(transaksi.id, insert[0].insertId));

    res.status(201).json(MakeResponse(transaksiData, 'Berhasil membuat transaksi!'));
  } catch (error) {
    next(error);
  }
}

async function createTransaksiBooking(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(transaksiBookingSchema, req.body);
    const request = req.body as TransaksiBookingSchema;

    const paketData = await db.query.paket.findFirst({
      where: eq(paket.id, request.paket_id),
    });

    if (!paketData) {
      throw ErrNotFound('Paket tidak ditemukan!');
    }

    const karyawanData = await db.query.karyawan.findFirst({
      where: eq(karyawan.id, request.karyawan_id),
    });
    if (!karyawanData) {
      throw ErrNotFound('Karyawan tidak ditemukan!');
    }

    console.log('request.jadwal_booking', request.jadwal_booking);

    const insert = await db.insert(transaksi).values({
      karyawan_id: request.karyawan_id,
      paket_id: request.paket_id,
      nama_customer: request.nama_customer,
      no_hp: request.no_hp,
      status: 'booking',
      jadwal_booking: new Date(request.jadwal_booking),
      total_harga: paketData.harga!,
    });

    const transaksiData = await db
      .select({
        ...getTableColumns(transaksi),
        karyawan: { ...getTableColumns(karyawan) },
        paket: { ...getTableColumns(paket) },
      })
      .from(transaksi)
      .innerJoin(karyawan, eq(karyawan.id, transaksi.karyawan_id))
      .innerJoin(paket, eq(paket.id, transaksi.paket_id))
      .where(eq(transaksi.id, insert[0].insertId));

    res.status(201).json(MakeResponse(transaksiData, 'Berhasil membuat transaksi booking!'));
  } catch (error) {
    next(error);
  }
}

async function completeTransaksi(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const transaksiData = await db.query.transaksi.findFirst({
      where: eq(transaksi.id, Number(id)),
    });

    if (!transaksiData) {
      throw ErrNotFound('Transaksi tidak ditemukan!');
    }

    await db
      .update(transaksi)
      .set({
        status: 'selesai',
      })
      .where(eq(transaksi.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil menyelesaikan transaksi!'));
  } catch (error) {
    next(error);
  }
}

async function cancelTransaksi(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const transaksiData = await db.query.transaksi.findFirst({
      where: eq(transaksi.id, Number(id)),
    });

    if (!transaksiData) {
      throw ErrNotFound('Transaksi tidak ditemukan!');
    }

    await db
      .update(transaksi)
      .set({
        status: 'batal',
      })
      .where(eq(transaksi.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil membatalkan transaksi!'));
  } catch (error) {
    next(error);
  }
}

async function processTransaksiBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const transaksiData = await db.query.transaksi.findFirst({
      where: eq(transaksi.id, Number(id)),
    });

    if (!transaksiData) {
      throw ErrNotFound('Transaksi tidak ditemukan!');
    }

    await db
      .update(transaksi)
      .set({
        status: 'proses',
      })
      .where(eq(transaksi.id, Number(id)));

    res.status(200).json(MakeResponse(null, 'Berhasil memproses transaksi booking!'));
  } catch (error) {
    next(error);
  }
}

const COLUMNS = ['ID', 'Tanggal', 'Nama Customer', 'No HP', 'Paket', 'Barber', 'Total'];
async function report(req: Request, res: Response, next: NextFunction) {
  try {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Transaksi');

    const from = req.query.from;
    const to = req.query.to;

    const cols = ws.addRow(COLUMNS);
    cols.font = { bold: true };

    const transaksiList = await db
      .select({
        ...getTableColumns(transaksi),
        karyawan: { ...getTableColumns(karyawan) },
        paket: { ...getTableColumns(paket) },
      })
      .from(transaksi)
      .orderBy(asc(transaksi.status))
      .innerJoin(karyawan, eq(karyawan.id, transaksi.karyawan_id))
      .innerJoin(paket, eq(paket.id, transaksi.paket_id))
      .where(eq(transaksi.status, 'selesai'));

    let grandTotal = 0;
    transaksiList.forEach((transaksi) => {
      grandTotal += transaksi.total_harga;
      ws.addRow([
        transaksi.id,
        transaksi.waktu_transaksi,
        transaksi.nama_customer,
        transaksi.no_hp,
        transaksi.paket.nama,
        transaksi.karyawan.nama,
        transaksi.total_harga,
      ]);
    });
    ws.addRow(['', '', '', '', '', 'Total', grandTotal]);

    // Set the response headers to indicate a file download
    const date = new Date();
    const fileName = `report_${date.getDay()}_${date.getMonth()}_${date.getFullYear()}.xlsx`;
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Write the Excel file to the response
    await wb.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    next(error);
  }
}
