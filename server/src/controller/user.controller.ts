import { type NextFunction, type Request, type Response } from "express";
import { log } from "$/utils/logger";
import { omit } from "lodash";
import { createUser } from "$/service/user.service";
import { createSuccessResponse } from "$/utils/apiResponse";
import { type CreateUserInput } from "$/schema/user.schema";

type UserDocument = {
  toJSON(): Record<string, unknown>;
};

export function createUserHandler(
  req: Request<object, object, CreateUserInput>,
  res: Response,
  next: NextFunction
): void {
  createUser(req.body)
    .then((user: UserDocument) => {
      if (!user || typeof user.toJSON !== "function") {
        throw new Error("Invalid user object returned from createUser");
      }
      const userWithoutPassword = omit(user.toJSON(), "password");
      res.status(201).send(createSuccessResponse(userWithoutPassword, "User created successfully"));
    })
    .catch((e) => {
      log.error(e);
      next(e);
    });
}
