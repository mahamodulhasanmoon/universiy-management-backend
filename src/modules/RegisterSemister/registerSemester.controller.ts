import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import {
  createRegisterSemesterService,
  getAllRegisterSemesterService,
  updateRegisterSemesterService,
} from './registerSemester.service';
import { sendResponse } from '../../utils/sendResponse';

export const createSemisterRegisterController: RequestHandler = catchAsync(
  async (req, res) => {
    const semisterData = req.body;

    const data = await createRegisterSemesterService(semisterData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully Registered Semister',
      data: data,
    });
  },
);

export const getRegisterSemesterController: RequestHandler = catchAsync(
  async (req, res) => {
    const data = await getAllRegisterSemesterService(req.query);

    sendResponse(res, {
      status: 200,
      success: true,
      message: 'successfully Registered Semister',
      data: data,
    });
  },
);

export const updateSemisterRegisterController: RequestHandler = catchAsync(
  async (req, res) => {
    const semisterData = req.body;
    const { id } = req.params;

    const data = await updateRegisterSemesterService(id, semisterData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully Registered Semister',
      data: data,
    });
  },
);
