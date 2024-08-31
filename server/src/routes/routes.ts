import { createUserHandler } from "$/controller/user.controller";
import { type Application } from "express";
import { validate } from "$/middlewares/validateResource";
import { createUserSchema } from "$/schema/user.schema";

export const routes = (app: Application) => {
  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);
};
