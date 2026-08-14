import type { Express, Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const bugsController = require("./bugs.controller.ts");

const bugsRouter = express.Router({ mergeParams: true }); // Allows ProjectID to be read from parent

bugsRouter.get("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return bugsController.handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.post("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return bugsController.handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.delete("/:bugId", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR + AUTHENTICATOR
  if(req) {
    return bugsController.handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

module.exports = bugsRouter;