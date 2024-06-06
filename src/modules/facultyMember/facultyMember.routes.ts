import express from 'express';
import { FacultyControllers } from './facultyMember.controller';
import { updateFacultyValidationSchema } from './facultyMember.validation';
import { requestValidator } from '../../middlewares/requestValidator';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  requestValidator(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
