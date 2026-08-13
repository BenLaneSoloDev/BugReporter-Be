import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function getProjectsProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    

    return res.status(StatusCodes.OK).json({ item: "The projects found" });
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = getProjectsProvider;