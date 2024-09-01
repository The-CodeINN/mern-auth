import { createUserHandler } from "$/controller/user.controller";
import { type Application, type Request, type Response, type NextFunction } from "express";
import { validateResource } from "$/middlewares/validateResource";
import { createUserSchema } from "$/schema/user.schema";
import { type CreateUserInput } from "$/schema/user.schema";
import { createSessionHandler, getUserSessionHandler } from "$/controller/session.controller";
import { createSessionSchema } from "$/schema/session.schema";
import { requireUser } from "$/middlewares/requireUser";

export const routes = (app: Application) => {
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  app.post(
    "/api/users",
    validateResource(createUserSchema),
    (req: Request<object, object, CreateUserInput>, res: Response, next: NextFunction) => {
      // Ensures proper error handling and correct typing
      createUserHandler(req, res, next).catch(next);
    }
  );

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    (req: Request, res: Response, next: NextFunction) => {
      createSessionHandler(req, res, next).catch(next);
    }
  );

  app.get("/api/sessions", requireUser, (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    getUserSessionHandler(req, res, next).catch(next);
  });
};
