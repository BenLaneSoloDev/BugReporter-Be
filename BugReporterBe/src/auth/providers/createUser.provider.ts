import type { Request, Response } from "express";
import User from "../user.schema";
import { StatusCodes } from "http-status-codes";
import errorLogger from "../../helpers/errorLogger.helper";

async function createUserProvider(req: Request, res: Response)
{
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    
    await user.save();

    return res.status(StatusCodes.CREATED).json(user);
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error creating a new user: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
}

export default createUserProvider;