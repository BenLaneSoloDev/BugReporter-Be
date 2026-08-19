import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorLogger from "../../helpers/errorLogger.helper";
import { matchedData } from "express-validator";

async function loginUserProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);
  
  try {

    return res.status(StatusCodes.CREATED).json({});

  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error logging user in: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
}

export default loginUserProvider;