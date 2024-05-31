import { z } from 'zod';

export const facultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
        invalid_type_error:'Name Must Be A String'
    })
  }),
});
