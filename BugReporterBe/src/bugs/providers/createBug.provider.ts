import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function createBugProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    // ? Add user ID to this object

    // ? Add this new bug to the database

    return res.status(StatusCodes.OK).json({ item: "Created bug here"})
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = createBugProvider;