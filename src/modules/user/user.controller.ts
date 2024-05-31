import { RequestHandler } from 'express';
import { createStudentService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

export const createStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    const { password, studentData } = req.body;
    const data = await createStudentService(password, studentData);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created User',
      data: data,
    });
  },
);
