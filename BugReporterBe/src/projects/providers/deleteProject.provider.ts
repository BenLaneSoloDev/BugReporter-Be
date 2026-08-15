import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Project = require("../projects.schema.ts");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.ts");

async function deleteProjectProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req); 

  try {

    const id = validatedResult.projectId;
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

module.exports = deleteProjectProvider;