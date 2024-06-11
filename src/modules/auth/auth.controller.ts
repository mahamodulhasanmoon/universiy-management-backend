import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { loginService } from './auth.service';

export const loginController: RequestHandler = catchAsync(async (req, res) => {
  const result = await loginService(req.body);

  return sendResponse(res, {
    status: 200,
    success: true,
    message: 'Login Successfull',
    data: result,
  });
});
