import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { createCourseValidationSchema, updateCourseValidationSchema } from './course.validation';
import {
  assignFacultiesController,
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
// assign Faculties
CourseRoutes.put(
  '/:id/assign-faculties',
    // requestValidator(updateCourseValidationSchema),
    assignFacultiesController,
);
CourseRoutes.delete('/:id', deleteCourseByIdController);
