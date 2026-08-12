import type { Request, Response } from "express";
const getBugsProvider = require("./providers/getBugs.provider.ts");
const createBugProvider = require("./providers/createBug.provider.ts");
const deleteBugProvider = require("./providers/deleteBug.provider.ts");

async function handleGetBugs(req: Request, res: Response) {
  return await getBugsProvider(req, res);
};

async function handlePostBugs(req: Request, res: Response) {
  return await createBugProvider(req, res);
};

async function handleDeleteBugs(req: Request, res: Response)
{
  return await deleteBugProvider(req, res);
};

module.exports = { 
  handleGetBugs,
  handlePostBugs,
  handleDeleteBugs
};