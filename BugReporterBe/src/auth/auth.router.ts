import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { handleGetLogin, handleGetSignup } from "./auth.controller.ts";

import { validationResult } from "express-validator";
import createUserValidator from "./validators/createUser.validator.ts";
import loginUserValidator from "./validators/loginUser.validator.ts";

const authRouter = express.Router();

/**
 * @openapi
 * 
 * /auth/login:
 *  post:
 *    summary: Login a user
 *    tags: [Users]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserLogin'
 *    responses:
 *      201:
 *        description: User login successful
 *        content: 
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 201
 *              message: Created
 *              data:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTg0NWVjMjJjODM4ZmYxNTA1MDc4Y2QiLCJlbWFpbCI6Im5hdGxhbmVAZW1haWwuY29tIiwiaWF0IjoxNzg3NTY0MzYzLCJleHAiOjE3ODc2NTA3NjN9.a02kmUk7_gd6hF4Kgte1cdTVJTLYSw_lVXRtS5qVbWE
 *                firstName: John
 *                lastName: Smith
 *                email: JohnSmith@gmail.com
 *      400:
 *        description: Bad Request error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 400
 *              message: Bad Request
 *              error:
 *                message: Cannot find user, please check your credentials
 *      401:
 *        description: Not authorized error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: Unauthorized
 *              error:
 *                - type: field
 *                  value: JohnSmithgmail.com
 *                  msg: Email is required, and must be a valid email
 *                  path: email
 *                  location: body
 *      403:
 *        description: Forbidden Error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Please login again, invalid token
 *      404:
 *        description: Not Found Error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 404
 *              message: Not Found
 *              error:
 *                message: Cannot find user, please check your credentials
 *      504:
 *        description: Gateway Timeout Error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 504
 *              message: Gateway Timeout
 *              error:
 *                reason: Unable to process your request at this moment, please try later
 */

authRouter.post("/login", loginUserValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

authRouter.post("/signup", createUserValidator, (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetSignup(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }

});

export default authRouter;