import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const requestValidator = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await schema.parseAsync({
        body : req.body,
      });
      next()
    } catch (error) {
      next(error);
    }
  };
};
