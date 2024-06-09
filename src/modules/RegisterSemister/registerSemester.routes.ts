import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import {
  createSemisterRegisterController,
  getRegisterSemesterController,
} from './registerSemester.controller';
import { createRegisterValidation } from './registerSemester.validation';

export const semesterRegisterRoutes = Router();

semesterRegisterRoutes.post(
  '/',
  requestValidator(createRegisterValidation),
  createSemisterRegisterController,
);
semesterRegisterRoutes.get('/', getRegisterSemesterController);
