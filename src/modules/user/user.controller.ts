import { RequestHandler } from 'express';
import {
  createFacultyMemberService,
  createStudentService,
} from './user.service';
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

export const createFacultyMemberController: RequestHandler = catchAsync(
  async (req, res) => {
    const { password, studentData } = req.body;
    const data = await createFacultyMemberService(password, studentData);
    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created User',
      data: data,
    });
  },
);
