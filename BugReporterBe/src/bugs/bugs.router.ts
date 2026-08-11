import type { Express, Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const bugsController = require("./bugs.controller.ts");

const bugsRouter = express.Router();

bugsRouter.get("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return bugsController.handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.post("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return bugsController.handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

bugsRouter.delete("/", (req: Request, res: Response) => {
  // TODO: ADD VALIDATOR
  if(req) {
    return bugsController.handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

module.exports = bugsRouter;