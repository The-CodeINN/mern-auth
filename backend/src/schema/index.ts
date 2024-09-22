import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: 'Email is required',
  })
  .email()
  .min(5)
  .max(255);
const passwordSchema = z
  .string({
    required_error: 'Password is required',
  })
  .min(6)
  .max(255);

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z
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

const verificationCodeSchema = z.string().min(1).max(24);

const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

export type RegisterInput = Omit<
  z.infer<typeof registerSchema>,
  'confirmPassword'
>;

export type LoginInput = z.infer<typeof loginSchema>;
export type VerificationCodeInput = z.infer<typeof verificationCodeSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export {
  registerSchema,
  loginSchema,
  verificationCodeSchema,
  resetPasswordSchema,
};
