import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Project from "../projects.schema.ts";
import { matchedData } from "express-validator";
import errorLogger from "../../helpers/errorLogger.helper.ts";

async function createProjectProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);
  const project = new Project({ 
      user: req.user?.sub, // User will always exist due to the middleware authentication
      ...validatedResult
    });

  try {
    await project.save();
    return res.status(StatusCodes.CREATED).json(project);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error creating a new project: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default createProjectProvider;