import { NextFunction, Request, Response } from "express";
import { log } from "$/utils/logger";
import { omit } from "lodash";
import { createUser } from "$/service/user.service";
import { createSuccessResponse, createErrorResponse } from "$/utils/apiResponse";
import { CreateUserInput } from "$/schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUser(req.body);
    const userWithoutPassword = omit(user.toJSON(), "password");
    return res
      .status(201)
      .send(createSuccessResponse(userWithoutPassword, "User created successfully"));
  } catch (e) {
    log.error(e);
    next(e);
  }
}
