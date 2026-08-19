import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { JWT_SECRET, JWT_ACCESS_EXPIRATION_TTL } from "../../settings/envConfig";
import UserTokenPayload from "../../types/userTokenPayload.type";

interface IUserToken {
  _id: Types.ObjectId,
  email: string
}

function generateTokenProvider(user: IUserToken) {

  const payload: UserTokenPayload = {
    sub: user["_id"].toString(),
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + parseInt(JWT_ACCESS_EXPIRATION_TTL)
  };
    
  return jwt.sign(payload, JWT_SECRET); // Returns no token if a secret is not setup
}

export default generateTokenProvider;