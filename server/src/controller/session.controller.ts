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

export async function createSessionHandler(
  req: CreateSessionRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate the user's password
    const { email, password } = req.body as { email: string; password: string };
    const user = await validatePassword(email, password);
    if (!user) {
      return res.status(401).json(createErrorResponse("Invalid username or password"));
    }

    // Create a new session
    const session = await createSession({
      user: user._id as Types.ObjectId,
      userAgent: req.get("user-agent") ?? "",
    });

    // create access token
    const accessToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get("accessTokenTtl"), // 15 minutes
      }
    );

    // create refresh token
    const refreshToken = signJwt(
      {
        ...user,
        session: session._id,
      },
      {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
      }
    );

    // Return the session and refresh token
    return res.status(201).json(
      createSuccessResponse(
        {
          accessToken,
          refreshToken,
        },
        "Session created successfully"
      )
    );
  } catch (error) {
    log.error(error);
    next(error);
    return;
  }
}

export async function getUserSessionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user as { _id: Types.ObjectId };
    const userId: Types.ObjectId = user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.status(200).json(createSuccessResponse(sessions, "Sessions retrieved successfully"));
  } catch (error) {
    log.error(error);
    next(error);
    return;
  }
}

export async function deleteSessionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const user = res.locals.user as { session: Types.ObjectId };
    const sessionId = user.session;

    await updateSession({ _id: sessionId }, { valid: false });
  } catch (error) {
    log.error(error);
    next(error);
    return;
  }
}
