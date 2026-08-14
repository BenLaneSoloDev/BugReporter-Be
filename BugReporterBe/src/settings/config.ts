import type { Express } from "express";
const express = require("express");
const fs = require("fs");               // Node.js API
const path = require("path");           // Node.js API
const morgan = require("morgan");
const cors= require("cors");

const expressWinstonLogger = require("../middleware/expressWinston.middleware.ts")

const projectsRouter = require("../projects/projects.router.ts");
const bugsRouter = require("../bugs/bugs.router.ts");
const authRouter = require("../auth/auth.router.ts");

function configureApp(app: Express) : void
{
  // ? ADDED MIDDLEWARE
  app.use(express.json());

  // TODO: CORS must be tested before release to ensure it works correctly
  const corsOptions = { origin: ["http://localhost:3001/"] };
  app.use(cors(corsOptions));

  let accessLogStream = fs.createWriteStream(path.join(__dirname, "..", "access.log"), { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));

  app.use(expressWinstonLogger);

  // ? ADDED ROUTES
  app.use("/bugs", bugsRouter);
  app.use("/auth", authRouter);
  app.use("/projects", projectsRouter);

  // TODO: ADDED API DOC ROUTE

  // TODO: CATCH INVALID ROUTES
}

module.exports = configureApp;