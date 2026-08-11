import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function handleGetProjects(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handlePostProjects(req: Request, res: Response) {
  // TODO: ADD PROVIDER
};

async function handleDeleteProjects(req: Request, res: Response)
{
  // TODO: ADD PROVIDER
};

module.exports = { 
  handleGetProjects,
  handlePostProjects,
  handleDeleteProjects
};