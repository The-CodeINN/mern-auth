"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendPasswordResetEmail = exports.verifyEmail = exports.refreshUserAccessToken = exports.loginUser = exports.createAccount = void 0;
const session_model_1 = require("../models/session.model");
const user_model_1 = require("../models/user.model");
const verificationCode_model_1 = require("../models/verificationCode.model");
const date_1 = require("../utils/date");
const env_1 = require("../constants/env");
const appAssert_1 = require("../utils/appAssert");
const http_1 = require("../constants/http");
const jwt_1 = require("../utils/jwt");
const sendMail_1 = require("../utils/sendMail");
const emailTemplate_1 = require("../utils/emailTemplate");
const bcrypt_1 = require("../utils/bcrypt");
const createAccount = async (data) => {
    // verify email is not already in use
    const existingUser = await user_model_1.UserModel.exists({ email: data.email });
    // if (existingUser) {
    //   throw new Error('Email is already in use');
    // }
    (0, appAssert_1.appAssert)(!existingUser, http_1.CONFLICT, 'Email is already in use');
    // create user in db
    const user = await user_model_1.UserModel.create({
        email: data.email,
        password: data.password,
    });
    const userId = user._id;
    // create verification token
    const verificationCode = await verificationCode_model_1.VerificationCodeModel.create({
        userId,
        type: "email_verification" /* verificationCodeTypes.EmailVerification */,
        expiresAt: (0, date_1.oneDayFromNow)(),
    });
    const url = `${env_1.APP_ORIGIN}/email/verify/${verificationCode._id}`;
    // send verification email
    const { error } = await (0, sendMail_1.sendMail)({
        to: user.email,
        ...(0, emailTemplate_1.getVerifyEmailTemplate)(url),
    });
    if (error) {
        console.log(error);
    }
    // create a session
    const session = await session_model_1.SessionModel.create({
        userId,
        userAgent: data.userAgent,
    });
    // sign access and refresh token
    const refreshToken = (0, jwt_1.signToken)({ sessionId: session._id }, jwt_1.refreshTokenSignOptions);
    const accessToken = (0, jwt_1.signToken)({
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
exports.createAccount = createAccount;
const loginUser = async (data) => {
    // get the user by email
    const user = await user_model_1.UserModel.findOne({ email: data.email });
    (0, appAssert_1.appAssert)(user, http_1.UNAUTHORIZED, 'Invalid email or password');
    // verify the password from the user
    const isPasswordValid = await user.comparePassword(data.password);
    (0, appAssert_1.appAssert)(isPasswordValid, http_1.UNAUTHORIZED, 'Invalid email or password');
    const userId = user._id;
    // create a new session
    const session = await session_model_1.SessionModel.create({
        userId,
        userAgent: data.userAgent,
    });
    const sessionInfo = {
        sessionId: session._id,
    };
    // sign access and refresh token
    const refreshToken = (0, jwt_1.signToken)(sessionInfo, jwt_1.refreshTokenSignOptions);
    const accessToken = (0, jwt_1.signToken)({
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
exports.loginUser = loginUser;
const refreshUserAccessToken = async (refreshToken) => {
    //verify the refresh token
    const { payload } = (0, jwt_1.verifyToken)(refreshToken, {
        secret: jwt_1.refreshTokenSignOptions.secret,
    });
    (0, appAssert_1.appAssert)(payload, http_1.UNAUTHORIZED, 'Invalid refresh token');
    // get the session
    const session = await session_model_1.SessionModel.findById(payload.sessionId);
    const now = Date.now();
    (0, appAssert_1.appAssert)(session && session.expiresAt.getTime() > now, http_1.UNAUTHORIZED, 'Session expired');
    // refresh the session if it's within 24 hours of expiring
    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= date_1.ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        session.expiresAt = (0, date_1.sevenDaysFromNow)();
        await session.save();
    }
    const newRefreshToken = sessionNeedsRefresh
        ? (0, jwt_1.signToken)({
            sessionId: session._id,
        }, jwt_1.refreshTokenSignOptions)
        : undefined;
    const accessToken = (0, jwt_1.signToken)({
        userId: session.userId,
        sessionId: session._id,
    });
    return {
        accessToken,
        newRefreshToken,
    };
};
exports.refreshUserAccessToken = refreshUserAccessToken;
const verifyEmail = async (code) => {
    // get the verification code
    const validCode = await verificationCode_model_1.VerificationCodeModel.findOne({
        _id: code,
        type: "email_verification" /* verificationCodeTypes.EmailVerification */,
        expiresAt: { $gt: new Date() },
    });
    (0, appAssert_1.appAssert)(validCode, http_1.NOT_FOUND, 'Invalid or expired verification code');
    // update user emailVerified to true
    const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(validCode.userId, { verified: true }, { new: true });
    (0, appAssert_1.appAssert)(updatedUser, http_1.INTERNAL_SERVER_ERROR, 'Failed to verify email');
    // delete verification code
    await validCode.deleteOne();
    // return user
    return {
        user: updatedUser.omitPassword(),
    };
};
exports.verifyEmail = verifyEmail;
const sendPasswordResetEmail = async (email) => {
    // Catch any errors that were thrown and log them (but always return a success)
    // This will prevent leaking sensitive data back to the client (e.g. user not found, email not sent).
    try {
        const user = await user_model_1.UserModel.findOne({ email });
        (0, appAssert_1.appAssert)(user, http_1.NOT_FOUND, 'User not found');
        // check for max password reset requests (2 emails in 5min)
        const fiveMinAgo = (0, date_1.fiveMinutesAgo)();
        const count = await verificationCode_model_1.VerificationCodeModel.countDocuments({
            userId: user._id,
            type: "password_reset" /* verificationCodeTypes.PasswordReset */,
            createdAt: { $gt: fiveMinAgo },
        });
        (0, appAssert_1.appAssert)(count <= 1, http_1.TOO_MANY_REQUESTS, 'Too many requests, please try again later');
        const expiresAt = (0, date_1.oneHourFromNow)();
        const verificationCode = await verificationCode_model_1.VerificationCodeModel.create({
            userId: user._id,
            type: "password_reset" /* verificationCodeTypes.PasswordReset */,
            expiresAt,
        });
        const url = `${env_1.APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`;
        const { data, error } = await (0, sendMail_1.sendMail)({
            to: email,
            ...(0, emailTemplate_1.getPasswordResetTemplate)(url),
        });
        (0, appAssert_1.appAssert)(data?.id, http_1.INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`);
        return {
            url,
            emailId: data.id,
        };
    }
    catch (error) {
        console.log('SendPasswordResetError:', error.message);
        return {};
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const resetPassword = async (data) => {
    // get the verification code
    const validCode = await verificationCode_model_1.VerificationCodeModel.findOne({
        _id: data.verificationCode,
        type: "password_reset" /* verificationCodeTypes.PasswordReset */,
        expiresAt: { $gt: new Date() },
    });
    (0, appAssert_1.appAssert)(validCode, http_1.NOT_FOUND, 'Invalid or expired verification code');
    // update user password
    const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(validCode.userId, {
        password: await (0, bcrypt_1.hashValue)(data.password),
    });
    (0, appAssert_1.appAssert)(updatedUser, http_1.INTERNAL_SERVER_ERROR, 'Failed to reset password');
    //delete verification code
    await validCode.deleteOne();
    // delete all sessions
    await session_model_1.SessionModel.deleteMany({ userId: validCode.userId });
    // return user
    return {
        user: updatedUser.omitPassword(),
    };
};
exports.resetPassword = resetPassword;
