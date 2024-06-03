import { Router } from 'express';
import userRoute from './user_controller';
import authRoute from './auth_controller';
import karyawanRoute from './karyawan_controller';

const apiRoute = Router();
apiRoute.use(userRoute);
apiRoute.use(authRoute);
apiRoute.use(karyawanRoute);
export default apiRoute;
