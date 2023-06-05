import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/exceptions/AppError";

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = {
    error: err.name,
    detail: err.message,
  };

  res.status(err.statusCode).json(error);
}
