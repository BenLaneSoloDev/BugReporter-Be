import UserTokenPayload from "./userTokenPayload.type";

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserTokenPayload;
  }
}