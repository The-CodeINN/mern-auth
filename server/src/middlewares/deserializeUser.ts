import { verifyJwt } from "$/utils/jwt.utils";
import { type Request, type Response, type NextFunction } from "express";
import { get } from "lodash";
import { log } from "$/utils/logger";
import { type JwtPayload } from "jsonwebtoken";
import { reIssueAccessToken } from "$/service/session.service";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) {
    next();
    return;
  }

  const { valid, decoded, expired } = verifyJwt(accessToken);

  if (valid && decoded) {
    res.locals.user = decoded as JwtPayload;
    next();
    return;
  }

  if (expired && refreshToken) {
    reIssueAccessToken(refreshToken as string)
      .then((newAccessToken) => {
        if (newAccessToken) {
          res.setHeader("x-access-token", newAccessToken);
          const result = verifyJwt(newAccessToken);

          if (result.valid && result.decoded) {
            res.locals.user = result.decoded as JwtPayload;
          }
        }
        next();
      })
      .catch((error) => {
        log.error("Error reissuing access token:", error);
        next(error);
      });
  } else {
    next();
  }
};
