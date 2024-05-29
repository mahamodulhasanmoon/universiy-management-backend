import { Router } from 'express';
import { createStudentController } from './user.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { studentValidationSchema } from '../student/student.validation';

export const userRoutes = Router();
userRoutes.post(
  '/create-student',
  requestValidator(studentValidationSchema),
  createStudentController,
);
userRoutes.post('/create-admin');
userRoutes.post('/create-faculty');
