import { CookieOptions, Response } from 'express';
import { fifteenMinutesFromNow, sevenDaysFromNow } from './date';

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = process.env.NODE_ENV !== 'development';
export const refreshTokenPath = '/auth/refresh';

const defaultCookieOptions: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: sevenDaysFromNow(),
  path: refreshTokenPath,
});

export const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: Params): Response => {
  res.cookie('accessToken', accessToken, getAccessTokenCookieOptions());
  res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

  return res;
};

export const clearAuthCookies = (res: Response): Response => {
  res.clearCookie('accessToken').clearCookie('refreshToken', {
    path: refreshTokenPath,
  });

  return res;
};
