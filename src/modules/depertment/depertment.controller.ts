import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { createDepertmentService,  getAllDepertmentService,  getDepertmentByIdService, updateDepertmentService } from './depertment.service';


export const createDepertmentController: RequestHandler = catchAsync(
  async (req, res) => {
    const DepertmentData = req.body;

    const data = await createDepertmentService(DepertmentData);

    sendResponse(res, {
      status: 201,
      success: true,
      message: 'successfully created Depertment',
      data: data,
    });
  },
);

export const getAllDepertmentController: RequestHandler = async (_req, res) => {
  const result = await getAllDepertmentService();
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'All Depertments fetch successfully',
    data: result,
  });
};

export const getDepertmentByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await getDepertmentByIdService(id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Depertment fetch successfully',
    data: result,
  });
};

export const updateDepertmentByIdController: RequestHandler = async (
  req,
  res,
) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateDepertmentService(id, data);
  sendResponse(res, {
    status: 200,
    success: true,
    message: ' Depertment fetch successfully',
    data: result,
  });
};
