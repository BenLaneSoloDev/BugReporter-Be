import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";
import { matchedData } from "express-validator";
import Project from "../../projects/projects.schema.ts";

async function deleteBugProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);

  try {
    const bugId = validatedResult.bugId;
    const bug = await Bug.findOne({ _id: bugId });
    
    const project = await Project.findOne({ _id: bug?.project, user: req.user?.sub })
    if (!project) return res.status(StatusCodes.NOT_FOUND).json({ reason: "No Bug found for the provided ID" });

    const deletedBug = await Bug.deleteOne({ _id: bugId });
    return res.status(StatusCodes.OK).json(deletedBug);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error deleting a bug: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default deleteBugProvider;