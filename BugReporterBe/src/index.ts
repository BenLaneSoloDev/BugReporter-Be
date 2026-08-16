import type { Express, Request, Response } from "express";
import configureApp from "./settings/config.ts";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({path: envFile});

const port = parseInt(process.env.PORT as string);
const app: Express = express();

configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL as string,
      { dbName: process.env.DATABASE_NAME as string }
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