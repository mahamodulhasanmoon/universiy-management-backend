import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import {
  createSemisterRegisterController,
  getRegisterSemesterController,
} from './registerSemester.controller';
import { createRegisterValidation } from './registerSemester.validation';
import { updateSemesterByIdController } from '../semister/semister.controller';

export const semesterRegisterRoutes = Router();

semesterRegisterRoutes.post(
  '/',
  requestValidator(createRegisterValidation),
  createSemisterRegisterController,
);
semesterRegisterRoutes.get('/', getRegisterSemesterController);
semesterRegisterRoutes.get('/:id', updateSemesterByIdController);
