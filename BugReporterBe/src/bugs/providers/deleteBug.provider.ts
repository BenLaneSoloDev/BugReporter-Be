import type { Request, Response } from "express";
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const Bug = require("../bugs.schema.ts");
const errorLogger = require("../../helpers/errorLogger.helper.ts");

async function deleteBugProvider(req: Request, res: Response)
{
  const data = req; // Validate using express validator

  try {

    const bugId = req.params.bugId;
    
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

module.exports = deleteBugProvider;