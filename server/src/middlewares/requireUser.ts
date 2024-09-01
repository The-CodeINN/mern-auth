import { type Request, type Response, type NextFunction } from "express";
import { createErrorResponse } from "$/utils/apiResponse";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = res.locals.user;

  if (!user) {
    res.status(403).json(createErrorResponse("Authentication required"));
    return;
  }

  next();
};
