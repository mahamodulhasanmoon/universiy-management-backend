import { NextFunction, Request, Response } from 'express';
import { Student } from './student.model';
import { studentValidationSchema } from './student.validation';

export const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsedData = studentValidationSchema.parse(req.body);
    // const user = new Student(parsedData)
    // user.isUserExist

    const data = await Student.create(parsedData);
    res.json({
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
