import jwt from 'jsonwebtoken';
import { verificationCodeTypes } from '../constants/verificationCodeTypes';
import { SessionModel } from '../models/session.model';
import { UserModel } from '../models/user.model';
import { VerificationCodeModel } from '../models/verificationCode.model';
import { RegisterInput } from '../schema';
import { oneDayFromNow } from '../utils/date';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env';
import { appAssert } from '../utils/appAssert';
import { CONFLICT, UNAUTHORIZED } from '../constants/http';
import { refreshTokenSignOptions, signToken } from '../utils/jwt';

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

  const userId = user._id;

  // create verification token
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: verificationCodeTypes.EmailVerification,
    expiresAt: oneDayFromNow(),
  });
  // send verification email

  // create a session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access and refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  const accessToken = signToken({
    userId,
    sessionId: session._id,
  });

  // return user and token
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (data: RegisterInput) => {
  // get the user by email
  const user = await UserModel.findOne({ email: data.email });
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');

  // verify the password from the user
  const isPasswordValid = await user.comparePassword(data.password);
  appAssert(isPasswordValid, UNAUTHORIZED, 'Invalid email or password');

  const userId = user._id;

  // create a new session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  // sign access and refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId,
  });

  // return user and token
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
