import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Project = require("../projects.schema.ts");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.ts");

async function createProjectProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);
  // ! Replace User ID with authenticated user
    const project = new Project({
      user: "00000020f51bb4362eee2a4d",
      ...validatedResult
    });

  try {
    await project.save();
    return res.status(StatusCodes.OK).json({ item: "The project created" });
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error creating a new project: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = createProjectProvider;