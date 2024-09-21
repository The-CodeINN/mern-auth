import { CookieOptions, Response } from 'express';
import { fifteenMinutesFromNow, sevenDaysFromNow } from './date';

type Params = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const secure = process.env.NODE_ENV !== 'development';

const defaultCookieOptions: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
};

const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: fifteenMinutesFromNow(),
});

const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...defaultCookieOptions,
  expires: sevenDaysFromNow(),
  path: '/auth/refresh',
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
