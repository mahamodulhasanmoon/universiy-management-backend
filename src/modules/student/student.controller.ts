import { RequestHandler } from 'express';
import { deleteStudentService, getAllStudentService } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

export const getAllStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    const data = await getAllStudentService(req.query);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Data Retrieved successfully',
      data: data,
    });
  },
);
export const deleteStudentController: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = await deleteStudentService(id as string);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'successfully deleted User',
      data: data,
    });
  },
);
