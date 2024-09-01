import { verifyJwt } from "$/utils/jwt.utils";
import { type Request, type Response, type NextFunction } from "express";
import { get } from "lodash";
import { log } from "$/utils/logger";
import { type JwtPayload } from "jsonwebtoken";

export const deSerializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  if (!accessToken) {
    next();
    return; // No token, so move on to the next middleware
  }

  try {
    const { valid, decoded } = verifyJwt(accessToken);

    if (valid && decoded) {
      res.locals.user = decoded as JwtPayload;
    }

    next();
    return; // Proceed to the next middleware
  } catch (e: unknown) {
    log.error(e);

    if (e instanceof Error) {
      next(e);
      return; // Passing the error to the next middleware or error handler
    }

    next(new Error("An unexpected error occurred during token verification."));
  }
};
