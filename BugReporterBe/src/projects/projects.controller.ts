import type { Request, Response } from "express";
const getProjectsProvider = require("./providers/getProjects.provider.ts");
const createProjectProvider = require("./providers/createProject.provider.ts");
const deleteProjectProvider = require("./providers/deleteProject.provider.ts");

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

module.exports = { 
  handleGetProjects,
  handlePostProjects,
  handleDeleteProjects
};