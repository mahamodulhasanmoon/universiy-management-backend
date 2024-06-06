import { Router } from 'express';
import {
  createFacultyMemberController,
  createStudentController,
} from './user.controller';
import { requestValidator } from '../../middlewares/requestValidator';
import { studentValidationSchema } from '../student/student.validation';
import { createFacultyValidationSchema } from '../facultyMember/facultyMember.validation';

export const userRoutes = Router();
userRoutes.post(
  '/create-student',
  requestValidator(studentValidationSchema),
  createStudentController,
);
userRoutes.post(
  '/create-faculty',
  requestValidator(createFacultyValidationSchema),
  createFacultyMemberController,
);
userRoutes.post('/create-admin');
