import db from '../db';
import bcrypt from 'bcrypt';
import {
  AuthLoginSchema,
  AuthRegisterSchema,
  authLoginSchema,
  authRegisterSchema,
} from '../schemas/auth_schema';
import { Router, NextFunction, Request, Response } from 'express';
import { AuthAccessToken, AuthRefreshToken } from './middleware/authenticate';
import { ErrConflict, ErrUnauthorized } from '../utils/error';
import { eq } from 'drizzle-orm';
import { validateRequest } from '../utils/validator';
import { setTokenCookie } from '../utils/cookies';
import { generateToken } from '../utils/jwt';
import { MakeResponse } from '../utils/response';
import { users } from '../db/schemas/users';

const authRoute = Router();
authRoute.post('/auth/login', login);
authRoute.post('/auth/register', register);
authRoute.get('/auth/current', AuthAccessToken, currentUser);
authRoute.get('/auth/refresh', AuthRefreshToken, refresh);
authRoute.delete('/auth/logout', logout);
export default authRoute;

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(authRegisterSchema, req.body);
    const request = req.body as AuthRegisterSchema;

    var user = await db.query.users.findFirst({
      where: eq(users.username, request.username),
    });

    if (user) {
      throw ErrConflict('Username yang sama sudah terdaftar!');
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);

    const insert = await db.insert(users).values({
      nama: request.nama,
      username: request.username,
      password: hashedPassword,
    });

    // Ambil data user yang baru saja di insert
    var user = await db.query.users.findFirst({
      where: eq(users.id, insert[0].insertId),
    });

    // Hilangkan password dari response
    const { password, ...payload } = user!;

    res.status(201).json(MakeResponse(payload, 'Berhasil register pengguna!'));
  } catch (error) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    validateRequest(authLoginSchema, req.body);
    const request = req.body as AuthLoginSchema;

    const user = await db.query.users.findFirst({
      where: eq(users.username, request.username),
    });

    if (!user || !(await bcrypt.compare(request.password, user.password!))) {
      throw ErrUnauthorized('Periksa kembali username dan password Anda');
    }

    const { password, createdAt, updatedAt, ...payload } = user; // Omit password, createdAt and updatedAt from user object
    const accessToken = generateToken(payload);
    const refreshToken = generateToken({ id: payload.id }, 'refresh');

    setTokenCookie(res, accessToken, 'access');
    setTokenCookie(res, refreshToken, 'refresh');

    const resBody = {
      accessToken,
      refreshToken,
    };

    res.status(200).json(MakeResponse(resBody, 'Berhasil login!'));
  } catch (error) {
    next(error);
  }
}

async function currentUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(MakeResponse(req.user, 'User authenticated.'));
  } catch (error) {
    next(error);
  }
}

async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw ErrUnauthorized('User not found');
    }

    const { password, createdAt, updatedAt, ...payload } = user; // Omit password, createdAt and updatedAt from user object
    const accessToken = generateToken(payload);
    const refreshToken = generateToken({ id: payload.id }, 'refresh');

    setTokenCookie(res, accessToken, 'access');
    setTokenCookie(res, refreshToken, 'refresh');

    const resBody = {
      accessToken,
      refreshToken,
    };

    res.status(200).json(MakeResponse(resBody, 'Berhasil refresh token'));
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json(MakeResponse(null, 'Berhasil logout!'));
  } catch (error) {
    next(error);
  }
}
