import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Bug = require("../bugs.schema.ts");

async function createBugProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    console.log("Request: ", req);

    // ? Add user ID to this object
    const bug = new Bug({
      project: req.body.project,
      title: req.body.title,
      developmentArea: req.body.developmentArea,
      severity: req.body.severity,
      stepsToReproduce: req.body.stepsToReproduce,
      environmentsUsed: req.body.environmentsUsed,
      expectedResult: req.body.expectedResult,
      actualResult: req.body.actualResult
    })

    // ? Add this new bug to the database
    await bug.save();

    return res.status(StatusCodes.CREATED).json(bug);
  }
  catch (error) {
    console.log(error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = createBugProvider;