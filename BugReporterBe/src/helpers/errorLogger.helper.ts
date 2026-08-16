import type { Request } from "express"; 
import logger from "./winston.helper.ts";

function errorLogger(message: String, req: Request, error: Error) {
  logger.error(message.toString(), { 
    metadata: {
      errorName: error.name,
      method: req.method,
      url: req.url,
      error: error
    }
  });
}

export default errorLogger;