import { z } from 'zod';

const registerSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email()
      .min(5)
      .max(255),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .max(255),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(6)
      .max(255),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = Omit<
  z.infer<typeof registerSchema>,
  'confirmPassword'
>;

export { registerSchema };
