import express, { type Application } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "config";
import { connect } from "./utils/connect";
import { log } from "./utils/logger";
import { routes } from "./routes/routes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = config.get<number>("port");

const startServer = async () => {
  try {
    await connect();
    routes(app);

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
