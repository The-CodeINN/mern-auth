import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './config/db';
import { PORT, NODE_ENV, APP_ORIGIN } from './constants/env';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import { catchErrors } from './utils/catchErrors';
import { OK } from './constants/http';
import { authRoutes } from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors({ origin: APP_ORIGIN, credentials: true }));

app.use(cookieParser());

app.get(
  '/health',
  catchErrors(async (req, res, next) => {
    res.status(OK).json({ message: 'API is running' });
  })
);

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  await connectToDatabase();
});
