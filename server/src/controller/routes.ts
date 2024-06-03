import { Router } from 'express';
import userRoute from './user_controller';
import authRoute from './auth_controller';
import karyawanRoute from './karyawan_controller';
import paketRoute from './paket_controller';

const apiRoute = Router().use(userRoute, authRoute, karyawanRoute, paketRoute);
export default apiRoute;
