import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'userid or email Is Required',
    }),
    password: z.string({
      required_error: 'password Is Required',
    }),
  }),
});
