"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appAssert_1 = require("../utils/appAssert");
const http_1 = require("../constants/http");
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    (0, appAssert_1.appAssert)(accessToken, http_1.UNAUTHORIZED, 'Not authorized', "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    const { error, payload } = (0, jwt_1.verifyToken)(accessToken);
    (0, appAssert_1.appAssert)(payload, http_1.UNAUTHORIZED, error === 'jwt expired' ? 'Token expired' : 'Invalid token', "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    const jwtPayload = payload;
    req.userId = jwtPayload.userId;
    req.sessionId = jwtPayload.sessionId;
    next();
};
exports.authenticate = authenticate;
