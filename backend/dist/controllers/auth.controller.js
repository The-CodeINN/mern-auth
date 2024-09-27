"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.sendPasswordHandler = exports.verifyEmailHandler = exports.refreshHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
const http_1 = require("../constants/http");
const session_model_1 = require("../models/session.model");
const schema_1 = require("../schema");
const auth_service_1 = require("../services/auth.service");
const appAssert_1 = require("../utils/appAssert");
const catchErrors_1 = require("../utils/catchErrors");
const cookies_1 = require("../utils/cookies");
const jwt_1 = require("../utils/jwt");
exports.registerHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    // validate request body
    const request = schema_1.registerSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });
    // call service
    const { user, accessToken, refreshToken } = await (0, auth_service_1.createAccount)(request);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken })
        .status(http_1.CREATED)
        .json({ user });
});
exports.loginHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    // validate request body
    const request = schema_1.loginSchema.parse({
        ...req.body,
        userAgent: req.headers['user-agent'],
    });
    // call service
    const { accessToken, refreshToken } = await (0, auth_service_1.loginUser)(request);
    // return response
    return (0, cookies_1.setAuthCookies)({ res, accessToken, refreshToken }).status(http_1.OK).json({
        message: 'Login successful',
    });
});
exports.logoutHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = (0, jwt_1.verifyToken)(accessToken || '');
    if (payload) {
        await session_model_1.SessionModel.findByIdAndDelete(payload.sessionId);
    }
    // clear cookies
    return (0, cookies_1.clearAuthCookies)(res)
        .status(http_1.OK)
        .json({ message: 'Logout successful' });
});
exports.refreshHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    (0, appAssert_1.appAssert)(refreshToken, http_1.UNAUTHORIZED, 'Missing refresh token');
    const { accessToken, newRefreshToken } = await (0, auth_service_1.refreshUserAccessToken)(refreshToken);
    if (newRefreshToken) {
        res.cookie('refreshToken', newRefreshToken, (0, cookies_1.getRefreshTokenCookieOptions)());
    }
    return res
        .status(http_1.OK)
        .cookie('accessToken', accessToken, (0, cookies_1.getAccessTokenCookieOptions)())
        .json({ message: 'AccessToken refreshed' });
});
exports.verifyEmailHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const verificationCode = schema_1.verificationCodeSchema.parse(req.params.code);
    // call service
    await (0, auth_service_1.verifyEmail)(verificationCode);
    // return response
    return res.status(http_1.OK).json({ message: 'Email verified' });
});
exports.sendPasswordHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const email = schema_1.emailSchema.parse(req.body.email);
    await (0, auth_service_1.sendPasswordResetEmail)(email);
    return res.status(http_1.OK).json({ message: 'Password reset email sent' });
});
exports.resetPasswordHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const request = schema_1.resetPasswordSchema.parse(req.body);
    // call service
    await (0, auth_service_1.resetPassword)(request);
    // return response
    return (0, cookies_1.clearAuthCookies)(res)
        .status(http_1.OK)
        .json({ message: 'Password reset successfully' });
});
