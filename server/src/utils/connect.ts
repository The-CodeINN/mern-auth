import mongoose from "mongoose";
import config from "config";
import { log } from "./logger";

export const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (error) {
    log.error("Error connecting to database: ", error);
  }

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Database connected");
  });
};
