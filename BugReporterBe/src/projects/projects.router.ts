import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { handleGetProjects, handlePostProjects, handleDeleteProjects } from "./projects.controller.ts";
import bugRouter from "../bugs/bugs.router.ts";

import { validationResult } from "express-validator";
import createProjectValidator from "./validators/createProject.validator.ts";
import deleteProjectValidator from "./validators/deleteProject.validator.ts";
import getProjectValidator from "./validators/getProjects.validator";

const projectsRouter = express.Router();

projectsRouter.get("/", getProjectValidator, (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

projectsRouter.post("/", createProjectValidator, (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handlePostProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

projectsRouter.delete("/:projectId", deleteProjectValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleDeleteProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

projectsRouter.use("/:projectId/bugs", bugRouter); // Allow ProjectID to be passed through URL

export default projectsRouter;