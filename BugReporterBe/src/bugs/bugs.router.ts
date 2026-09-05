import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import {handleGetBugs, handlePostBugs, handleDeleteBugs } from "./bugs.controller.ts";
import authenticateToken from "../middleware/authenticateToken.middleware.ts";

import { validationResult } from "express-validator";
import getBugsValidator from "./validators/getBugs.validator.ts";
import createBugValidator from "./validators/createBug.validator.ts";
import deleteBugValidator from "./validators/deleteBug.validator.ts";

const bugsRouter = express.Router({ mergeParams: true }); // Allows ProjectID to be read from parent

/**
 * @openapi
 * 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 * /projects/{projectId}/bugs:
 *  get:
 *    summary: Get all bugs
 *    tags: [Bugs]
 *    security: 
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: projectId
 *        required: true
 *        description: The ID of the project the bug is being created for
 *      - in: query
 *        name: limit
 *        schema: 
 *          type: integer
 *          default: 5
 *        description: The number of projects needed in a single response
 *      - in: query
 *        name: page
 *        schema: 
 *          type: integer
 *          default: 1
 *        description: The page number of the projects response 
 *    responses:
 *      200:
 *        description: Bugs found successfully
 *        content: 
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 200
 *              message: OK
 *              data:
 *                - _id: 6a8efe9ef53f0ba573f745c9
 *                  project: 6a86df762077c2eb8085ece0
 *                  title: Bug Submission
 *                  developmentArea: UI
 *                  severity: extreme
 *                  stepsToReproduce: ["Submit the bug wizard on the final page"]
 *                  environmentsUsed: ["Windows"]
 *                  expectedResult: Return to home page with data sent to the server
 *                  actualResult: Page is stuck in the wizard, and no data is sent to the server
 *                  createdAt: 2026-08-26T14:56:30.349Z
 *                  updatedAt: 2026-08-26T14:56:30.349Z
 *              pagination:
 *                meta:
 *                  bugsPerPage: 5 
 *                  totalBugs: 7
 *                  currentPage: 1
 *                  totalPages: 2
 *                links:
 *                  first: http://localhost:3001/projects/6a86df762077c2eb8085ece0/bugs?limit=5&page=1
 *                  last: http://localhost:3001/projects/6a86df762077c2eb8085ece0/bugs?limit=5&page=2
 *                  current: http://localhost:3001/projects/6a86df762077c2eb8085ece0/bugs?limit=5&page=1
 *                  next: http://localhost:3001/projects/6a86df762077c2eb8085ece0/bugs?limit=5&page=2
 *                  previous: ""
 *      400:
 *        description: Bad Request error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 400
 *              message: Bad Request
 *              error:
 *                - type: field
 *                  value: 6a86df762077c2eb8085ece
 *                  msg: A valid ProjectID must be used
 *                  path: projectId
 *                  location: params
 *      401:
 *        description: Not authorized error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: Unauthorized
 *              error:
 *                message: You are not authorized to perform this request
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
 *                reason: No Project found for the provided ID
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

bugsRouter.get("/", [...getBugsValidator, authenticateToken], (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

/**
 * @openapi
 * 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 * /projects/{projectId}/bugs:
 *  post:
 *    summary: Create a new bug
 *    tags: [Bugs]
 *    security: 
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: projectId
 *        required: true
 *        description: The ID of the project the bug is being created for
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Bug'
 *    responses:
 *      201:
 *        description: Bug created successfully
 *        content: 
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 201
 *              message: Created
 *              data:
 *                project: 6a86df762077c2eb8085ece0
 *                title: Bug Submission
 *                developmentArea: UI
 *                severity: extreme
 *                stepsToReproduce: ["Submit the bug wizard on the final page"]
 *                environmentsUsed: ["Windows"]
 *                expectedResult: Return to home page with data sent to the server
 *                actualResult: Page is stuck in the wizard, and no data is sent to the server
 *                _id: 6a8efe9ef53f0ba573f745c9
 *                createdAt: 2026-08-26T14:56:30.349Z
 *                updatedAt: 2026-08-26T14:56:30.349Z
 *      400:
 *        description: Bad Request error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 400
 *              message: Bad Request
 *              error:
 *                - type: field
 *                  value: []
 *                  msg: A bug must have an environement setup
 *                  path: environmentsUsed
 *                  location: body
 *      401:
 *        description: Not authorized error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: Unauthorized
 *              error:
 *                message: You are not authorized to perform this request
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
 *                reason: No Project found for the provided ID
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

bugsRouter.post("/", [...createBugValidator, authenticateToken], (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handlePostBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

/** 
 * @openapi
 * 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 * /bugs/{bugId}:
 *  delete:
 *    summary: Delete an existing bug
 *    tags: [Bugs]
 *    security: 
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: bugId
 *        required: true
 *        description: The ID of the bug being deleted
 *    responses:
 *      200:
 *        description: Bug deleted successfully
 *        content: 
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                acknowledged: true
 *                deletedCount: 1
 *      400:
 *        description: Bad Request error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 400
 *              message: Bad Request
 *              error:
 *                - type: field
 *                  value: 6a86df942077c2eb8085ece
 *                  msg: A BugID must be provided to delete a bug
 *                  path: bugId
 *                  location: params
 *      401:
 *        description: Not authorized error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: Unauthorized
 *              error:
 *                message: You are not authorized to perform this request
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
 *                reason: No Bug found for the provided ID
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

bugsRouter.delete("/:bugId", [...deleteBugValidator, authenticateToken], (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleDeleteBugs(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

export default bugsRouter;