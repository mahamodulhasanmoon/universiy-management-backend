import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import {
  createSemisterService,
  getAllSemesterService,
  getSemesterByIdService,
  updateSemisterService,
} from './semister.service';

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

export const getAllSemesterController: RequestHandler = async (_req, res) => {
  const result = await getAllSemesterService();
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Semesters fetch successfully',
    data: result,
  });
};

export const getSemesterByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await getSemesterByIdService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Semester fetch successfully',
    data: result,
  });
};

export const updateSemesterByIdController: RequestHandler = async (
  req,
  res,
) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateSemisterService(id, data);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Semester fetch successfully',
    data: result,
  });
};
