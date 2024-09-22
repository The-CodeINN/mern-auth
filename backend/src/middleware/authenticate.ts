import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import { appAssert } from '../utils/appAssert';
import { UNAUTHORIZED } from '../constants/http';
import { AppErrorCode } from '../constants/appErrorCode';
import { verifyToken } from '../utils/jwt';

interface JwtPayload {
  userId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
}

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    'Not authorized',
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === 'jwt expired' ? 'Token expired' : 'Invalid token',
    AppErrorCode.InvalidAccessToken
  );

  const jwtPayload = payload as JwtPayload;

  req.userId = jwtPayload.userId;
  req.sessionId = jwtPayload.sessionId;
  next();
};

export { authenticate };
