import { Types } from 'mongoose';
import { z } from 'zod';

export const createRegisterValidation = z.object({
  body: z.object({
    academicSemister: z.string().refine(val => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    }),
    status: z.enum(['upcomming', 'ongoing', 'ended']),
    startDate: z.string(),
    endDate: z.string(),
    minCradit: z.number().min(0),
    maxCradit: z.number().min(0),
  }),
});
