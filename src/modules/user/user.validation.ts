import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  needsPasswordChange: z.boolean().default(false),
});
