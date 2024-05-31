import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { facultyValidationSchema } from './faculty.validation';
import {
  createFacultyController,
  getAllFacultyController,
  getFacultyByIdController,
  updateFacultyByIdController,
} from './faculty.controller';

export const facultyRoutes = Router();

facultyRoutes.post(
  '/',
  requestValidator(facultyValidationSchema),
  createFacultyController,
);
facultyRoutes.get('/', getAllFacultyController);

// id controller
facultyRoutes.get('/:id', getFacultyByIdController);
facultyRoutes.patch(
  '/:id',
  requestValidator(facultyValidationSchema),
  updateFacultyByIdController,
);
