import type { Request, Response, NextFunction } from "express";
import { getReasonPhrase } from "http-status-codes";

function responseFormatter(req: Request, res: Response, next: NextFunction): void
{
  const originalJson = res.json;

  res.json = function(data: any): Response {
    const response: any = {
      status: res.statusCode >= 200 && res.statusCode < 300 ? "success" : "error",
      statusCode: res.statusCode,
      message: getReasonPhrase(res.statusCode)
    };

    if (res.statusCode >= 200 && res.statusCode < 300) {
      response.data = data?.pagination ? data.data : data; // Handles nested "data" when using pagination
    }

    if (res.statusCode > 300) { response.error = data; }

    if (data?.pagination) { response.pagination = data.pagination; };

    return originalJson.call(res, response); // Overrides the original response
  };

  next();
}

export default responseFormatter;