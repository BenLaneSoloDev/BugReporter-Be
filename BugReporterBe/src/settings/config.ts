import type { Express } from "express";
import express from "express";
import fs from "fs";               // Node.js API
import path from "path";           // Node.js API
import morgan from "morgan";
import cors from "cors";

import expressWinstonLogger from "../middleware/expressWinston.middleware.ts";

import projectsRouter from "../projects/projects.router.ts";
import bugsRouter from "../bugs/bugs.router.ts";
import authRouter from "../auth/auth.router.ts";
import responseFormatter from "../middleware/responseFormatter.middleware.ts";

function configureApp(app: Express) : void
{
  // ? ADDED MIDDLEWARE
  app.use(express.json());

  // TODO: CORS must be tested before release to ensure it works correctly
  const corsOptions = { origin: ["http://localhost:3001/"] };
  app.use(cors(corsOptions));

  let accessLogStream = fs.createWriteStream(path.join(__dirname, "..", "access.log"), { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));

  app.use(responseFormatter);

  app.use(expressWinstonLogger);

  // ? ADDED ROUTES
  app.use("/bugs", bugsRouter);
  app.use("/auth", authRouter);
  app.use("/projects", projectsRouter);

  // TODO: ADDED API DOC ROUTE

  // TODO: CATCH INVALID ROUTES
}

export default configureApp;