import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { handleGetLogin, handleGetSignup } from "./auth.controller.ts";

import { validationResult } from "express-validator";
import createUserValidator from "./validators/createUser.validator.ts";
import loginUserValidator from "./validators/loginUser.validator.ts";

const authRouter = express.Router();

authRouter.post("/login", loginUserValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

authRouter.post("/signup", createUserValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetSignup(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }

});

export default authRouter;