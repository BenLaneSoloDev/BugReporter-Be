import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

async function deleteBugProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    // ? Delete the bug from the database

    return res.status(StatusCodes.OK).json({ item: "The bug deleted" });
  }
  catch (error) {
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

module.exports = deleteBugProvider;