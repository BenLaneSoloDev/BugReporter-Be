import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import {handleGetBugs, handlePostBugs, handleDeleteBugs } from "./bugs.controller.ts";
import authenticateToken from "../middleware/authenticateToken.middleware.ts";

import { validationResult } from "express-validator";
import getBugsValidator from "./validators/getBugs.validator.ts";
import createBugValidator from "./validators/createBug.validator.ts";
import deleteBugValidator from "./validators/deleteBug.validator.ts";

const bugsRouter = express.Router({ mergeParams: true }); // Allows ProjectID to be read from parent

bugsRouter.get("/", [...getBugsValidator, authenticateToken], (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

bugsRouter.post("/", [...createBugValidator, authenticateToken], (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

bugsRouter.delete("/:bugId", [...deleteBugValidator, authenticateToken], (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

export default bugsRouter;