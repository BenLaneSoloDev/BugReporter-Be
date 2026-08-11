import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function handleGetBugs(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handlePostBugs(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handleDeleteBugs(req: Request, res: Response)
{
  // TODO: ADD PROVIDER
};

module.exports = { 
  handleGetBugs,
  handlePostBugs,
  handleDeleteBugs
};