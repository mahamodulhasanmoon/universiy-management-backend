import { RequestHandler } from 'express';
import { deleteStudentService } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

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
