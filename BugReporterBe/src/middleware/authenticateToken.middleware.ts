import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../settings/envConfig";
import UserTokenPayload from "../types/userTokenPayload.type";
import { BlacklistToken } from "../auth/blacklistToken.schema";

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to perform this request"});

  try {
    const isBlacklisted = await BlacklistToken.exists({ token })
    if (isBlacklisted) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token has been revoked, please login again"
      })
    }

    const user = jwt.verify(token, JWT_SECRET) as UserTokenPayload;
    req.user = user;
    return next();
  
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Please login again, invalid token"
    })
  }
} 

export default authenticateToken;