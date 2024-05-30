import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createSemisterValidationSchema } from './semister.validation';
import { createSemisterController } from './semister.controller';

export const academicRoutes = Router();

academicRoutes.post(
  '/',
  requestValidator(createSemisterValidationSchema),
  createSemisterController,
);
