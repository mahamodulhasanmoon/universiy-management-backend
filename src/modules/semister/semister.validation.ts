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

export const updateSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall']).optional(),
    code: z.enum(['A01', 'S02', 'F03']).optional(),
    year: z.string().optional().optional(),
    startMonth: z.enum([...monthsEnum] as [string, ...string[]]).optional(),
    endMonth: z.enum([...monthsEnum] as [string, ...string[]]).optional(),
  }),
});
