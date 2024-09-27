"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.verificationCodeSchema = exports.loginSchema = exports.registerSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z
    .string({
    required_error: 'Email is required',
})
    .email()
    .min(5)
    .max(255);
const passwordSchema = zod_1.z
    .string({
    required_error: 'Password is required',
})
    .min(6)
    .max(255);
const loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: passwordSchema,
    userAgent: zod_1.z.string().optional(),
});
exports.loginSchema = loginSchema;
const registerSchema = loginSchema
    .extend({
    confirmPassword: zod_1.z
        .string({
        required_error: 'Confirm Password is required',
    })
        .min(6)
        .max(255),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
exports.registerSchema = registerSchema;
const verificationCodeSchema = zod_1.z.string().min(1).max(24);
exports.verificationCodeSchema = verificationCodeSchema;
const resetPasswordSchema = zod_1.z.object({
    password: passwordSchema,
    verificationCode: verificationCodeSchema,
});
exports.resetPasswordSchema = resetPasswordSchema;
