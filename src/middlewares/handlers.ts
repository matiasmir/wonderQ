import { NextFunction, Request, Response } from "express";
import ErrorHandler from "./ErrorHandler";
export function handleError(
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json(err);
}
