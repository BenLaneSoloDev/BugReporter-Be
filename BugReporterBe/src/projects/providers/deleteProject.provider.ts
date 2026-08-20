import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Project from "../projects.schema.ts";
import Bug from "../../bugs/bugs.schema.ts";
import { matchedData } from "express-validator";
import errorLogger from "../../helpers/errorLogger.helper.ts";

async function deleteProjectProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req); 
  const id = validatedResult.projectId;

  try {
    const project = await Project.findOne({ _id: id, user: req.user?.sub });
    if (!project) return res.status(StatusCodes.NOT_FOUND).json({ reason: "No Project found for the provided ID" });
    
    await Bug.deleteMany({ project: id });

    const deletedProject = await Project.deleteOne({ _id: id });
    return res.status(StatusCodes.OK).json(deletedProject);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error deleting a project: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default deleteProjectProvider;