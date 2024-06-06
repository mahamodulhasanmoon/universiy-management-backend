import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createCourseValidationSchema, updateCourseValidationSchema } from './course.validation';
import {
  createCourseController,
  deleteCourseByIdController,
  getAllCourseController,
  getCourseByIdController,
  updateCourseByIdController,
} from './course.controller';

export const CourseRoutes = Router();

CourseRoutes.post(
  '/',
  requestValidator(createCourseValidationSchema),
  createCourseController,
);
CourseRoutes.get('/', getAllCourseController);

// id controller
CourseRoutes.get('/:id', getCourseByIdController);
CourseRoutes.patch(
  '/:id',
    requestValidator(updateCourseValidationSchema),
  updateCourseByIdController,
);
CourseRoutes.delete('/:id', deleteCourseByIdController);
