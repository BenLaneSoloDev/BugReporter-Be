import type { Express } from "express";
import configureApp from "./settings/config.ts";
import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL, DATABASE_NAME, PORT } from "./settings/envConfig.ts";

const port = parseInt(PORT);
const app: Express = express();

configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(
      DATABASE_URL,
      { dbName: DATABASE_NAME }
    );
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("App listening on port: " + port);
    }); 
  }
  catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

bootstrap();