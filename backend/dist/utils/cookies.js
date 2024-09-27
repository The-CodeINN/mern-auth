"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.getRefreshTokenCookieOptions = exports.getAccessTokenCookieOptions = exports.refreshTokenPath = void 0;
const date_1 = require("./date");
const secure = process.env.NODE_ENV !== 'development';
exports.refreshTokenPath = '/auth/refresh';
const defaultCookieOptions = {
    sameSite: 'strict',
    httpOnly: true,
    secure,
};
const getAccessTokenCookieOptions = () => ({
    ...defaultCookieOptions,
    expires: (0, date_1.fifteenMinutesFromNow)(),
});
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
const getRefreshTokenCookieOptions = () => ({
    ...defaultCookieOptions,
    expires: (0, date_1.sevenDaysFromNow)(),
    path: exports.refreshTokenPath,
});
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const setAuthCookies = ({ res, accessToken, refreshToken, }) => {
    res.cookie('accessToken', accessToken, (0, exports.getAccessTokenCookieOptions)());
    res.cookie('refreshToken', refreshToken, (0, exports.getRefreshTokenCookieOptions)());
    return res;
};
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => {
    res.clearCookie('accessToken').clearCookie('refreshToken', {
        path: exports.refreshTokenPath,
    });
    return res;
};
exports.clearAuthCookies = clearAuthCookies;
