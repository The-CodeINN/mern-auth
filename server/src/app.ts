import express, { type Application } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "config";
import { connect } from "./utils/connect";
import { log } from "./utils/logger";
import { routes } from "./routes/routes";
import { errorMiddleware } from "./middlewares/zod.middleware";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware";
import { deSerializeUser } from "./middlewares/deserializeUser";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(deSerializeUser);

const PORT = config.get<number>("port");

const startServer = async () => {
  try {
    await connect();
    routes(app);

    app.use(notFoundMiddleware);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
      log.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    log.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer().catch((error) => {
  log.error("Unhandled error during server startup:", error);
  process.exit(1);
});
