import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send("Invalid request");
    }
  }
};

export { validate };
