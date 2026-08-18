import type { Request, Response } from "express";
import User from "../user.schema";
import { StatusCodes } from "http-status-codes";
import errorLogger from "../../helpers/errorLogger.helper";
import { matchedData } from "express-validator";

async function createUserProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);

  try {
    const user = new User({
      firstName: validatedResult.firstName,
      lastName: validatedResult.lastName,
      email: validatedResult.email,
      password: validatedResult.password
    });
    
    await user.save();
    
    const { password, ...safeData } = user.toObject(); // Separates out sensitive data

    return res.status(StatusCodes.CREATED).json(safeData);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error creating a new user: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
}

export default createUserProvider;