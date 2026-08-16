import type { Request, Response } from "express";
import getProjectsProvider from "./providers/getProjects.provider.ts";
import createProjectProvider from "./providers/createProject.provider.ts";
import deleteProjectProvider from "./providers/deleteProject.provider.ts";

async function handleGetProjects(req: Request, res: Response) {
  return await getProjectsProvider(req, res);
};

async function handlePostProjects(req: Request, res: Response) {
  return await createProjectProvider(req, res);
};

async function handleDeleteProjects(req: Request, res: Response)
{
  return await deleteProjectProvider(req, res);
};

export { 
  handleGetProjects,
  handlePostProjects,
  handleDeleteProjects
};