import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";

async function createBugProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    const projectId = req.params.projectId;
    if (!projectId) throw new Error("No project assigned to bug");

    const bug = new Bug({
      project: projectId,
      title: req.body.title,
      developmentArea: req.body.developmentArea,
      severity: req.body.severity,
      stepsToReproduce: req.body.stepsToReproduce,
      environmentsUsed: req.body.environmentsUsed,
      expectedResult: req.body.expectedResult,
      actualResult: req.body.actualResult
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