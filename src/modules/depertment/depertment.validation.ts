import { z } from 'zod';

export const depertmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
        invalid_type_error:'Name Must Be A String'
    }),
    faculty: z.string({
        invalid_type_error:'Faculty  Must Be an ObjectID'
    })
  }),
});
