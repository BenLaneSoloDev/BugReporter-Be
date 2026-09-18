import type { Request, Response } from "express";
import { User } from "../user.schema";
import { StatusCodes } from "http-status-codes";
import errorLogger from "../../helpers/errorLogger.helper";
import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import { BlacklistToken } from "../blacklistToken.schema";

async function blacklistTokenProvider(req: Request, res: Response)
{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {

    if (token) {
      await BlacklistToken.create({ token })
    }

    return res.status(StatusCodes.OK).json({ message: "Signed Out" });
  }
  catch (error) {
    if (error instanceof Error) errorLogger(`Error signing out: ${error.message}`, req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at this moment, please try later"
    });
  }
}

export default blacklistTokenProvider;