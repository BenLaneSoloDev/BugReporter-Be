import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import {handleGetBugs, handlePostBugs, handleDeleteBugs } from "./bugs.controller.ts";

const bugsRouter = express.Router({ mergeParams: true }); // Allows ProjectID to be read from parent

bugsRouter.get("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.post("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.delete("/:bugId", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

export default bugsRouter;