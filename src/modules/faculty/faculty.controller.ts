import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { createFacultyService,  getAllFacultyService,  getFacultyByIdService, updateFacultyService } from './faculty.service';


export const createFacultyController: RequestHandler = catchAsync(
  async (req, res) => {
    const FacultyData = req.body;

    const data = await createFacultyService(FacultyData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created Faculty',
      data: data,
    });
  },
);

export const getAllFacultyController: RequestHandler = async (_req, res) => {
  const result = await getAllFacultyService();
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Facultys fetch successfully',
    data: result,
  });
};

export const getFacultyByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await getFacultyByIdService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Faculty fetch successfully',
    data: result,
  });
};

export const updateFacultyByIdController: RequestHandler = async (
  req,
  res,
) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateFacultyService(id, data);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Faculty fetch successfully',
    data: result,
  });
};
