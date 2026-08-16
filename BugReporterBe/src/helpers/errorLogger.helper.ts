import type { Request } from "express"; 

function errorLogger(message: String, req: Request, error: Error) {
  logger.error(message, { 
    metadata: {
      errorName: error.name,
      method: req.method,
      url: req.url,
      error: error
    }
  });
}

export default errorLogger;