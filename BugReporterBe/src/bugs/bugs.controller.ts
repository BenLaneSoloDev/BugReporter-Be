import type { Request, Response } from "express";
import getBugsProvider from "./providers/getBugs.provider.ts";
import createBugProvider from "./providers/createBug.provider.ts";
import deleteBugProvider from "./providers/deleteBug.provider.ts";

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

export { 
  handleGetBugs,
  handlePostBugs,
  handleDeleteBugs
};