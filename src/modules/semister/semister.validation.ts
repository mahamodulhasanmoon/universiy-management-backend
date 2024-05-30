import * as z from 'zod';
import { monthsEnum } from './semister.const';

export const createSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']),
    code: z.enum(['A01', 'S02', 'F03']),
    year: z.string().optional(),
    startMonth: z.enum([...monthsEnum] as [string, ...string[]]),
    endMonth: z.enum([...monthsEnum] as [string, ...string[]]),
  }),
});
