import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "$/utils/apiResponse";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  const errorResponse = createErrorResponse("Not Found", {
    details: `The requested URL ${req.originalUrl} was not found`,
  });
  res.status(404).json(errorResponse);
  next();
}
