import type { Express, Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const express = require("express");

const projectsRouter = express.Router();

projectsRouter.get("/", (req: Request, res: Response) => {
  console.log("HELLO");
  if(req) {
    res.status(StatusCodes.OK).json(StatusCodes.OK);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

module.exports = projectsRouter;