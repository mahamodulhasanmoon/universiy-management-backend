/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrors } from '../interfaces/error.interface';
import { handleZodError } from '../errors/zodError';
import { CustomError } from '../errors/CustomError';

/**
 * =========================== === === Global Error === === =====================
 */

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let status = 500;
  let message = 'Something went wrong';
  const success = false;
  let stackTrace: any =error.stack;
  let errors: TErrors = [
    {
      path: req.url,
      message: 'Something went wrong',
    },
  ];


  /**
   * =========================== === === Custom  Error === === =====================
   */

  if (error instanceof CustomError) {
    status = error.status;
    message = error.message;
  }

  /**
   * =========================== === === CAST  Error === === =====================
   */

  if (error.name === 'CastError') {
    status = 404;
    message = `Resource not found in ${error.path}`;
  }

  /**
   * =========================== === === Zod  Error === === =====================
   */

  if (error instanceof ZodError) {
    status = 400;
    message = `Validation Error`;
    stackTrace = error.stack
    ? { ...stackTrace, stack: error.stack }
    : stackTrace;
    const simplified = handleZodError(error);

    errors = simplified;
    
  }

  /**
   * =========================== === === MOngoose   Error === === =====================
   */
  if (error.code === 11000) {
    status = 400;
    status = 400;
    message = `Validation Error`;
    

    const keys = Object.keys(error.keyValue).join(', ');
    message = ` ${keys} Already Exists`;
    errors=error
  }
  
  let jsonResponse: any = { status, success, message,errors };
  if (process.env.NODE_ENV === 'development') {
    jsonResponse = {...jsonResponse,stackTrace};
  }

  return res.status(status).json(jsonResponse);
};
