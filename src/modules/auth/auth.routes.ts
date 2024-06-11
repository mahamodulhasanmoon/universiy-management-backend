import { Router } from 'express';
import { requestValidator } from '../../middlewares/requestValidator';
import { loginValidationSchema } from './auth.validation';
import { loginController } from './auth.controller';

export const authRoutes = Router();

authRoutes.post(
  '/login',
  requestValidator(loginValidationSchema),
  loginController,
);
