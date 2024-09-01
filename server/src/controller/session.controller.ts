import { createSession, findSessions, updateSession } from "$/service/session.service";
import { validatePassword } from "$/service/user.service";
import { type Request, type Response, type NextFunction } from "express";
import { createErrorResponse, createSuccessResponse } from "$/utils/apiResponse";
import { type Types } from "mongoose";
import { signJwt } from "$/utils/jwt.utils";
import config from "config";
import { log } from "$/utils/logger";

type CreateSessionRequest = {
  body: {
    email: string;
    password: string;
  };
} & Request;

export function createSessionHandler(
  req: CreateSessionRequest,
  res: Response,
  next: NextFunction
): void {
  const { email, password }: { email: string; password: string } = req.body as {
    email: string;
    password: string;
  };
  validatePassword(email, password)
    .then((user) => {
      if (!user) {
        return res.status(401).json(createErrorResponse("Invalid username or password"));
      }
      return createSession({
        user: user._id as Types.ObjectId,
        userAgent: req.get("user-agent") ?? "",
      }).then((session) => {
        const accessToken = signJwt(
          { ...user, session: session._id },
          { expiresIn: config.get("accessTokenTtl") }
        );
        const refreshToken = signJwt(
          { ...user, session: session._id },
          { expiresIn: config.get("refreshTokenTtl") }
        );
        return res
          .status(201)
          .json(
            createSuccessResponse({ accessToken, refreshToken }, "Session created successfully")
          );
      });
    })
    .catch((error) => {
      log.error(error);
      next(error);
    });
}

export function getUserSessionHandler(req: Request, res: Response, next: NextFunction): void {
  const user = res.locals.user as { _id: Types.ObjectId };
  findSessions({ user: user._id, valid: true })
    .then((sessions) => {
      res.status(200).json(createSuccessResponse(sessions, "Sessions retrieved successfully"));
    })
    .catch((error) => {
      log.error(error);
      next(error);
    });
}

export function deleteSessionHandler(req: Request, res: Response, next: NextFunction): void {
  const user = res.locals.user as { session: Types.ObjectId };
  updateSession({ _id: user.session }, { valid: false })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json(createSuccessResponse(null, "Session deleted successfully"));
      } else {
        res.status(404).json(createErrorResponse("Session not found or already invalid"));
      }
    })
    .catch((error) => {
      log.error(error);
      next(error);
    });
}
