import { type ApiResponse, createErrorResponse } from "$/utils/apiResponse";
import { z } from "zod";
import { type NextFunction, type Request, type Response } from "express";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  let statusCode = 500;
  let errorResponse: ApiResponse<null>;

  if (err instanceof z.ZodError) {
    statusCode = 400;
    errorResponse = createErrorResponse("Validation Error", {
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  } else if (err instanceof Error) {
    const error = err as Error & { statusCode?: number };
    statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    errorResponse = createErrorResponse(error.message);

    if (error.name === "UnauthorizedError") {
      statusCode = 401;
    } else if (error.name === "ForbiddenError") {
      statusCode = 403;
    }
    // 404 is now handled by checking res.statusCode
  } else {
    errorResponse = createErrorResponse("Internal Server Error");
  }

  res.status(statusCode).json(errorResponse);
}
