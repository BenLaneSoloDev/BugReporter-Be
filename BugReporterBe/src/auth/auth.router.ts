import type { Express, Request, Response } from "express";
const { StatusCodes } = require("http-status-codes");
const express = require("express");
const authController = require("./auth.controller.ts");

const authRouter = express.Router();

authRouter.post("/login", (req: Request, res: Response) => {
  console.log("HELLO");
  if(req) {
    return authController.handleGetLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

authRouter.post("/signup", (req: Request, res: Response) => {
  console.log("HELLO");
  if(req) {
    return authController.handleGetSignup(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

module.exports = authRouter;