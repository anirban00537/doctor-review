import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ResponseModel } from '../types/response';

export interface CustomParamsDictionary {
  [key: string]: any;
}

const catchAsync =
  (
    fn: RequestHandler<CustomParamsDictionary, ResponseModel, any, qs.ParsedQs, Record<string, any>>
  ) =>
  (
    req: Request<CustomParamsDictionary, ResponseModel, any, any, Record<string, any>>,
    res: Response<ResponseModel, Record<string, any>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
