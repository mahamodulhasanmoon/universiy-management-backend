/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler, ErrorRequestHandler } from 'express';
import { baseUrl } from '../config';
import { ZodError } from 'zod';
import { TErrors } from '../interfaces/error.interface';
import { handleZodError } from '../errors/zodError';

export class CustomError extends Error {
  constructor(
    public status: number = 500,
    public message: string,
    public stack = '',
  ) {
    super(message);
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * =========================== === === NotFoundError === === =====================
 */

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  const error = new CustomError(
    404,
    `Resource not found in ${baseUrl + req.url}`,
  );
  next(error);
};
/**
 * =========================== === === Global Error === === =====================
 */

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let status = 500;
  let message = 'Something went wrong';
  const success = false;
  let stackTrace: any = { error };
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
    stackTrace = error.stack
      ? { ...stackTrace, stack: error.stack }
      : stackTrace;
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
    const keys = Object.keys(error.keyValue).join(', ');
    message = ` ${keys} Already Exists`;
  }
  
  let jsonResponse: any = { status, success, message,errors };
  if (process.env.NODE_ENV === 'development') {
    jsonResponse = {...jsonResponse, stack:stackTrace.stack};
  }

  return res.status(status).json(jsonResponse);
};
