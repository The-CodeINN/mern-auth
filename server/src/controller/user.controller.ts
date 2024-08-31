import { Request, Response } from "express";
import { log } from "$/utils/logger";
import { omit } from "lodash";
import { createUser } from "$/service/user.service";
import { createSuccessResponse, createErrorResponse } from "$/utils/apiResponse";
import { CreateUserInput } from "$/schema/user.schema";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  try {
    const user = await createUser(req.body);
    const userWithoutPassword = omit(user.toJSON(), "password");
    return res
      .status(201)
      .send(createSuccessResponse(userWithoutPassword, "User created successfully"));
  } catch (e) {
    log.error(e);
    if (e instanceof Error) {
      return res.status(409).send(createErrorResponse(e.message));
    }
    return res.status(500).send(createErrorResponse("Internal server error"));
  }
}
