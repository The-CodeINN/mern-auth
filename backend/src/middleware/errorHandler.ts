import type { ErrorRequestHandler, Response } from 'express';
import { BAD_REQUEST } from '../constants/http';
import { z } from 'zod';
import { AppError } from '../utils/appError';

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(
    `PATH: ${req.path} | METHOD: ${req.method} | ERROR: ${error.message}`
  );

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

export { errorHandler };
