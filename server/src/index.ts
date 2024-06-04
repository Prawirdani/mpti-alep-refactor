import 'dotenv/config';
import express from 'express';
import { ErrorHandler } from './controller/middleware/error';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoute from './controller/routes';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.use('/api', apiRoute);

app.use(ErrorHandler);

const APP_PORT = process.env.APP_PORT ?? 3000;
app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
