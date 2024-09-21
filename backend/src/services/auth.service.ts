import jwt from 'jsonwebtoken';
import { verificationCodeTypes } from '../constants/verificationCodeTypes';
import { SessionModel } from '../models/session.model';
import { UserModel } from '../models/user.model';
import { VerificationCodeModel } from '../models/verificationCode.model';
import { RegisterInput } from '../schema';
import { oneDayFromNow } from '../utils/date';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import { appAssert } from '../utils/appAssert';
import { CONFLICT } from '../constants/http';

export const createAccount = async (data: RegisterInput) => {
  // verify email is not already in use
  const existingUser = await UserModel.exists({ email: data.email });
  // if (existingUser) {
  //   throw new Error('Email is already in use');
  // }

  appAssert(!existingUser, CONFLICT, 'Email is already in use');

  // create user in db
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification token
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: verificationCodeTypes.EmailVerification,
    expiresAt: oneDayFromNow(),
  });
  // send verification email

  // create a session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  // sign access and refresh token
  const refreshToken = jwt.sign(
    {
      sessionId: session._id,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '7d',
    }
  );
  const accessToken = jwt.sign(
    {
      userId: user._id,
      sessionId: session._id,
    },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m',
    }
  );

  // return user and token
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
