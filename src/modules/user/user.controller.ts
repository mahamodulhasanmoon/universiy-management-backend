import { NextFunction, Request, RequestHandler, Response } from 'express';
import { createStudentService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => next(error));
  };
};

export const createStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    // const parsedData = studentValidationSchema.parse(req.body)
    const { password, studentData } = req.body;

    const data = await createStudentService(password, studentData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created demo',
      data: data,
    });
  },
);
