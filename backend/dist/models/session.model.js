"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const mongoose_1 = require("mongoose");
const date_1 = require("../utils/date");
const sessionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    userAgent: {
        type: String,
    },
    expiresAt: {
        type: Date,
        default: date_1.sevenDaysFromNow,
    },
}, {
    timestamps: true,
});
const SessionModel = (0, mongoose_1.model)('Session', sessionSchema);
exports.SessionModel = SessionModel;
