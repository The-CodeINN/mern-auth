import { type Request, type Response, type NextFunction } from "express";
import { createErrorResponse } from "$/utils/apiResponse";
import { type IUser } from "$/models/user.model";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user as IUser | undefined;

  if (!user) {
    res.status(403).json(createErrorResponse("Authentication required"));
    return;
  }

  next();
};
