import { z } from 'zod';

const emailSchema = z
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

const verifyEmailSchema = z.string().min(1).max(24);

export type RegisterInput = Omit<
  z.infer<typeof registerSchema>,
  'confirmPassword'
>;

export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export { registerSchema, loginSchema, verifyEmailSchema };
