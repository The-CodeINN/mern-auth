"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_1 = require("../constants/http");
const zod_1 = require("zod");
const appError_1 = require("../utils/appError");
const cookies_1 = require("../utils/cookies");
const handleZodError = (res, error) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
    }));
    return res.status(http_1.BAD_REQUEST).json({
        message: error.message,
        errors,
    });
};
const handleAppError = (res, error) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
};
const errorHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path} | METHOD: ${req.method} | ERROR: ${error.message}`);
    if (req.path === cookies_1.refreshTokenPath) {
        (0, cookies_1.clearAuthCookies)(res);
    }
    if (error instanceof zod_1.z.ZodError) {
        return handleZodError(res, error);
    }
    if (error instanceof appError_1.AppError) {
        return handleAppError(res, error);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
