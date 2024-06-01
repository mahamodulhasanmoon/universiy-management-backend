import { Router } from 'express';
import { deleteStudentController, getAllStudentController } from './student.controller';

export const studentRoutes = Router();
studentRoutes.get('/', getAllStudentController);
studentRoutes.patch('/delete-student/:id', deleteStudentController);
