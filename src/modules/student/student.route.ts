import { Router } from 'express';
import { createStudentController } from './student.controller';

export const studentRoutes = Router();

studentRoutes.post('/', createStudentController);
