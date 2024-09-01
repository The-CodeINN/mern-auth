import { type Application } from "express";
import { validateResource } from "$/middlewares/validateResource";
import { createUserSchema } from "$/schema/user.schema";
import { createUserHandler } from "$/controller/user.controller";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "$/controller/session.controller";
import { createSessionSchema } from "$/schema/session.schema";
import { requireUser } from "$/middlewares/requireUser";

export const routes = (app: Application) => {
  app.get("/health", (req, res) => res.status(200).send("OK"));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

  app.get("/api/sessions", requireUser, getUserSessionHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);
};
