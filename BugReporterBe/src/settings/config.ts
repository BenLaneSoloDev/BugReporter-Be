import type { Express, Request, Response } from "express";
import express from "express";
import fs from "fs";               // Node.js API
import path from "path";           // Node.js API
import morgan from "morgan";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import responseFormatter from "../middleware/responseFormatter.middleware.ts";
import expressWinstonLogger from "../middleware/expressWinston.middleware.ts";

import projectsRouter from "../projects/projects.router.ts";
import bugsRouter from "../bugs/bugs.router.ts";
import authRouter from "../auth/auth.router.ts";
import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "../swagger.ts";

function configureApp(app: Express) : void
{
  // ? ADDED MIDDLEWARE
  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url}`);
    console.log(`[DEBUG] Origin Header: ${req.headers.origin}`);
    next();
  });

  // TODO: CORS must be tested before release to ensure it works correctly
  // TODO: MAKE SURE REAL URLS ARE ADDED TO ENV FILES FOR PRODUCTION
  const corsOptions = { origin: ["http://localhost:3001", "http://localhost:5173", "http://localhost:4173"] };
  app.use(cors(corsOptions));

  let accessLogStream = fs.createWriteStream(path.join(__dirname, "..", "access.log"), { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));
  
  app.use(responseFormatter);

  app.use(expressWinstonLogger);

  // ? ADDED ROUTES
  app.use("/bugs", bugsRouter);
  app.use("/auth", authRouter);
  app.use("/projects", projectsRouter);

  app.use("/api-docs", serve, setup(swaggerSpec));

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
  });
}

export default configureApp;