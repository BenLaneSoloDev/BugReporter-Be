import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createUserProvider from "./providers/createUser.provider";

async function handleGetLogin(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handleGetSignup(req: Request, res: Response) {
  return await createUserProvider(req, res);
};

export { 
  handleGetLogin,
  handleGetSignup
};