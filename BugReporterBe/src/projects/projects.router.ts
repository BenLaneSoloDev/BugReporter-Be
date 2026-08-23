import type { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { handleGetProjects, handlePostProjects, handleDeleteProjects } from "./projects.controller.ts";
import bugRouter from "../bugs/bugs.router.ts";
import authenticateToken from "../middleware/authenticateToken.middleware.ts";

import { validationResult } from "express-validator";
import createProjectValidator from "./validators/createProject.validator.ts";
import deleteProjectValidator from "./validators/deleteProject.validator.ts";
import getProjectValidator from "./validators/getProjects.validator";

const projectsRouter = express.Router();

projectsRouter.get("/", [...getProjectValidator, authenticateToken], (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleGetProjects(req, res);
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
 * /projects:
 *  post:
 *    summary: Create a new project
 *    tags: [Projects]
 *    security: 
 *      - bearerAuth: []
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Project'
 *    responses:
 *      201:
 *        description: Project created successfully
 *        content: 
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 201
 *              message: Created
 *              data:
 *                _id: 6a86df762077c2eb8085ece0
 *                title: Bug Report Wizard
 *                description: A bug reporting wizard website that allows you to track bugs found within different projects
 *                developmentAreas: [UI, API, Routing, Database]
 *                environments: [Windows, Mac]    
 *      400:
 *        description: Bad Request error
 *        content: 
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 400
 *              message: Bad Request
 *              error:
 *                type: field
 *                value: "UI"
 *                msg: Development areas must be an array and have at least one entry
 *                path: developmentAreas
 *                location: body
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

projectsRouter.post("/", [...createProjectValidator, authenticateToken], (req: Request, res: Response) => {

  const result = validationResult(req);

  if(result.isEmpty()) {
    return handlePostProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    
  
});

projectsRouter.delete("/:projectId", [...deleteProjectValidator, authenticateToken], (req: Request, res: Response) => {
  
  const result = validationResult(req);

  if(result.isEmpty()) {
    return handleDeleteProjects(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }    

});

projectsRouter.use("/:projectId/bugs", bugRouter); // Allow ProjectID to be passed through URL

export default projectsRouter;