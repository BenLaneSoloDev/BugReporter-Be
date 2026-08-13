import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function deleteProjectProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    // ? Delete the project from the database

    return res.status(StatusCodes.OK).json({ item: "The project deleted" });
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = deleteProjectProvider;