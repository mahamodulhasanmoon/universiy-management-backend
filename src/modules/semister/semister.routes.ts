import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import {
  createSemisterValidationSchema,
  updateSemisterValidationSchema,
} from './semister.validation';
import {
  createSemisterController,
  getAllSemesterController,
  getSemesterByIdController,
  updateSemesterByIdController,
} from './semister.controller';

export const academicRoutes = Router();

academicRoutes.post(
  '/',
  requestValidator(createSemisterValidationSchema),
  createSemisterController,
);
academicRoutes.get('/', getAllSemesterController);

// id controller
academicRoutes.get('/:id', getSemesterByIdController);
academicRoutes.patch(
  '/:id',
  requestValidator(updateSemisterValidationSchema),
  updateSemesterByIdController,
);
