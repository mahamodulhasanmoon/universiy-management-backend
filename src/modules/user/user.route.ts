import { Router } from 'express';
import { createStudentController } from './user.controller';

export const userRoutes = Router();
userRoutes.post('/create-student', createStudentController);
userRoutes.post('/create-admin');
userRoutes.post('/create-faculty');
