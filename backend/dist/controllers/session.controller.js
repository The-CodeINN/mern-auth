"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSessionHandler = exports.getSessionHandler = void 0;
const zod_1 = require("zod");
const http_1 = require("../constants/http");
const session_model_1 = require("../models/session.model");
const catchErrors_1 = require("../utils/catchErrors");
const appAssert_1 = require("../utils/appAssert");
exports.getSessionHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const sessions = await session_model_1.SessionModel.find({
        userId: req.userId,
        expiresAt: { $gt: new Date() },
    }, {
        _id: 1,
        createdAt: 1,
        userAgent: 1,
    }, {
        sort: { createdAt: -1 },
    });
    return res.status(http_1.OK).json(
    // mark the current session
    sessions.map((session) => ({
        ...session.toObject(),
        ...(session.id === req.sessionId && {
            isCurrent: true,
        }),
    })));
});
exports.deleteSessionHandler = (0, catchErrors_1.catchErrors)(async (req, res) => {
    const sessionId = zod_1.z.string().parse(req.params.id);
    const deletedSession = await session_model_1.SessionModel.findOneAndDelete({
        _id: sessionId,
        userId: req.userId,
    });
    (0, appAssert_1.appAssert)(deletedSession, http_1.NOT_FOUND, 'Session not found');
    return res.status(http_1.OK).json({
        message: 'Session removed',
    });
});
