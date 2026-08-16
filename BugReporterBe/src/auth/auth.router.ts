import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { handleGetLogin, handleGetSignup } from "./auth.controller.ts";

const authRouter = express.Router();

authRouter.post("/login", (req: Request, res: Response) => {
  console.log("HELLO");
  if(req) {
    return handleGetLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

authRouter.post("/signup", (req: Request, res: Response) => {
  console.log("HELLO");
  if(req) {
    return handleGetSignup(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(StatusCodes.BAD_REQUEST);
  }    
});

export default authRouter;