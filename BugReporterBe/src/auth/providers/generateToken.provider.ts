import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface IUserToken {
  _id: Types.ObjectId,
  email: string
}

function generateTokenProvider(user: IUserToken) {

  const payload = {
    sub: user["_id"].toString(),
    email: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_ACCESS_EXPIRATION_TTL ?? "86400") // Defaults to 1 day
  };
    
  const secret = process.env.JWT_SECRET;
  console.log(secret);
  return secret ? jwt.sign(payload, secret) : ""; // Returns no token if a secret is not setup
}

export default generateTokenProvider;