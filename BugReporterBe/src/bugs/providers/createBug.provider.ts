import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";
import { matchedData } from "express-validator";

async function createBugProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);

  try {

    const projectId = validatedResult.projectId;
    if (!projectId) throw new Error("No project assigned to bug");

    const bug = new Bug({
      project: projectId,
      title: validatedResult.title,
      developmentArea: validatedResult.developmentArea,
      severity: validatedResult.severity,
      stepsToReproduce: validatedResult.stepsToReproduce,
      environmentsUsed: validatedResult.environmentsUsed,
      expectedResult: validatedResult.expectedResult,
      actualResult: validatedResult.actualResult
    })

    await bug.save();

    return res.status(StatusCodes.CREATED).json(bug);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error creating a new bug: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default createBugProvider;