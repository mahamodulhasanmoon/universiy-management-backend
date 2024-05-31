import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { depertmentValidationSchema } from './depertment.validation';
import {
  createDepertmentController,
  getAllDepertmentController,
  getDepertmentByIdController,
  updateDepertmentByIdController,
} from './depertment.controller';

export const DepertmentRoutes = Router();

DepertmentRoutes.post(
  '/',
  requestValidator(depertmentValidationSchema),
  createDepertmentController,
);
DepertmentRoutes.get('/', getAllDepertmentController);

// id controller
DepertmentRoutes.get('/:id', getDepertmentByIdController);
DepertmentRoutes.patch(
  '/:id',
  requestValidator(depertmentValidationSchema),
  updateDepertmentByIdController,
);
