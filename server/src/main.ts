import express, { type Request, type Response, type Application } from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import z from "zod";
import helmet from "helmet";
import cors from "cors";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  const bodySchema = z.object({
    name: z.string(),
    age: z.number(),
  });

  const result = bodySchema.parse(_req.body);
  res.status(200).json({
    message: "Hello, World!",
    body: result,
  });
});

app.use(zodMiddleware);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
