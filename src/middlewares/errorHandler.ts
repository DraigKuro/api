import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "Error interno del servidor";
  const source = err instanceof CustomError ? err.source : "controller";

  res.status(statusCode).json({
    success: false,
    error: { statusCode, source, message },
  });
};
