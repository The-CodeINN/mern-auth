"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeModel = void 0;
const mongoose_1 = require("mongoose");
const verificationCodeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    type: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
const VerificationCodeModel = (0, mongoose_1.model)('VerificationCode', verificationCodeSchema, 'verification_codes');
exports.VerificationCodeModel = VerificationCodeModel;
