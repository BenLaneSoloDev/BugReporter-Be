import type { Express, Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const projectsController = require("./projects.controller.ts");

const projectsRouter = express.Router();

projectsRouter.get("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return projectsController.handleGetProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

projectsRouter.post("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return projectsController.handlePostProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

projectsRouter.delete("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return projectsController.handleDeleteProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

module.exports = projectsRouter;