import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { createSemisterService } from './semister.service';

export const createSemisterController: RequestHandler = catchAsync(
  async (req, res) => {
    const semisterData = req.body;

    const data = await createSemisterService(semisterData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created Semister',
      data: data,
    });
  },
);
