import { Router } from 'express';
import { deleteStudentController } from './student.controller';

export const studentRoutes = Router();
studentRoutes.patch('/delete-student/:id', deleteStudentController);
