import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../settings/envConfig";
import UserTokenPayload from "../types/userTokenPayload.type";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authorized to perform this request "});
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if(err) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "Please login again, invalid token"
      });
    }

    req.user = user as UserTokenPayload;
    next();
  });
} 

export default authenticateToken;