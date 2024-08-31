import { createSession } from "$/service/session.service";
import { validatePassword } from "$/service/user.service";
import { type Request, type Response, type NextFunction } from "express";
import { createErrorResponse, createSuccessResponse } from "$/utils/apiResponse";
import { type Types } from "mongoose";
import { signJwt } from "$/utils/jwt.utils";
import config from "config";
import { log } from "$/utils/logger";

export async function createSessionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the user's password
    const user = await validatePassword(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json(createErrorResponse("Invalid username or password"));
    }

    // Create a new session
    const session = await createSession({
      user: user._id as Types.ObjectId,
      userAgent: req.get("user-agent") || "",
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
