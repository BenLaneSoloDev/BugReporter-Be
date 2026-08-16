import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

async function handleGetLogin(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handleGetSignup(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

export { 
  handleGetLogin,
  handleGetSignup
};