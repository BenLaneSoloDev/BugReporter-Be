import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function handleGetLogin(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handleGetSignup(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

module.exports = { 
  handleGetLogin,
  handleGetSignup
};