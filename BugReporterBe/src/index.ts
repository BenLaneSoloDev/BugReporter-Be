import type { Express, Request, Response } from "express";
const configureApp = require("./settings/config.ts");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({path: envFile});

const port = parseInt(process.env.PORT as string);
const app: Express = express();

configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL,
      { dbName: process.env.DATABASE_NAME }
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