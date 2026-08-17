import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import {handleGetBugs, handlePostBugs, handleDeleteBugs } from "./bugs.controller.ts";

import { validationResult } from "express-validator";

import createBugValidator from "./validators/createBug.validator.ts";
import deleteBugValidator from "./validators/deleteBug.validator.ts";

const bugsRouter = express.Router({ mergeParams: true }); // Allows ProjectID to be read from parent

bugsRouter.get("/", (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

bugsRouter.post("/", createBugValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

bugsRouter.delete("/:bugId", deleteBugValidator, (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

export default bugsRouter;