import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import errorLogger from "../../helpers/errorLogger.helper";
import { matchedData } from "express-validator";
import { User } from "../user.schema";
import bcrypt from "bcrypt";
import generateTokenProvider from "./generateToken.provider";

async function loginUserProvider(req: Request, res: Response)
{
  const validatedResult = matchedData(req);
  
  try {

    const user = await User.findOne({ email: validatedResult.email });
    if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please check your credentials" });

    const result = await bcrypt.compare(validatedResult.password, user.password);
    if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please check your credentials" });

    const { _id, email } = user;
    const token = generateTokenProvider({ _id, email });
    if (token.length === 0) throw new Error("No JWT Secret provided by server");

    return res.status(StatusCodes.CREATED).json({ 
      accessToken: token, 
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });

  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error logging user in: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
}

export default loginUserProvider;