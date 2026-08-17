import type { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import Bug from "../bugs.schema.ts";
import errorLogger from "../../helpers/errorLogger.helper.ts";
import { matchedData } from "express-validator";

async function deleteBugProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);

  try {

    const bugId = validatedResult.bugId;
    
    const deletedBug = await Bug.deleteOne({ _id: bugId });

    // TODO: Setup If Bug/Project actually exists within the validator
    if (deletedBug.deletedCount === 0) throw new Error(`No bug exists for this BugID (${bugId})`);

    return res.status(StatusCodes.OK).json(deletedBug);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error deleting a bug: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
};

export default deleteBugProvider;