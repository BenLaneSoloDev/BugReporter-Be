import type { Request } from "express";
import { body, param, ValidationChain, matchedData, type Meta, validationResult, type ValidationError } from "express-validator";
import mongoose from "mongoose";
import hasValidField from "../../helpers/hasValidField.helper";

const createBugValidator: ValidationChain[] = [
  param("projectId", "A bug must be linked to a valid ProjectID").notEmpty().isMongoId(),
  param("projectId").if((_value, meta: Meta) => { hasValidField(meta, "projectId") }).custom(async (_value, meta: Meta) => 
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const projectId = cleanData.projectId;

      const projectExists = await mongoose.model("Project").exists({ _id: projectId });
      if (!projectExists) throw new Error("No Project exists for the provided ProjectID");
      return true;
    }
  ),
  body("title", "A bug must have a title").notEmpty(),
  body("title", "The title must be a string").isString(),
  body("title", "The title must be less than 100 characters").isLength({ max: 100 }).trim(),
  body("developmentArea", "A bug must have a developmet area").notEmpty(),
  body("developmentArea", "The development area must be a string").isString().trim(),
  body("developmentArea").if((_value, meta: Meta) => { hasValidField(meta, "projectId") }).custom(async (value: [string], meta: Meta) =>
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const projectId = cleanData.projectId;

      const foundProject = await mongoose.model("Project").findById(projectId).select("developmentAreas");
      if (!foundProject) throw new Error("Invlaid ProjectID linked to this bug");
      
      if (!foundProject.developmentAreas?.includes(value))  throw new Error("The bug development area must be valid for the project linked");
      return true;
    }
  ),
  body("severity", "A bug must have a severity").notEmpty(),
  body("severity", `The severity must be a valid option ("low", "normal", "high", "critical")`).isIn(["low", "normal", "high", "critical"]),
  body("stepsToReproduce", "A bug must have steps to reproduce, but no more than 10").isArray({ min: 1, max: 10 }),
  body("stepsToReproduce.*", "The steps to reproduce must be strings with less than 100 characters").isString().isLength({ max: 100 }).trim(),
  body("environmentsUsed", "A bug must have an environement setup").notEmpty(),
  body("environmentsUsed.*", "The environemnts providedmust be strings").isString().trim(),
  body("environmentsUsed").if((_value, meta: Meta) => { hasValidField(meta, "projectId") }).custom(async (value: [string], meta: Meta) => 
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const projectId = cleanData.projectId;

      const foundProject = await mongoose.model("Project").findById(projectId).select("environments");
      if (!foundProject) throw new Error("Invlaid ProjectID linked to this bug");

      let invalidEntry: string = "";
      const isValid = value.every((env) => {
        const valid = foundProject.environments?.includes(env);
        if (!valid) invalidEntry = env;
        return valid;
      });
      if (!isValid) throw new Error(`The bug environments used must be valid for the project linked: '${invalidEntry}' was not valid`);
      return true;
    }
  ),
  body("expectedResult", "A bug must have an expected result").notEmpty(),
  body("expectedResult", "The expected result must be a string").isString(),
  body("expectedResult", "The expected result must be less than 250 characters").isLength({ max: 250 }).trim(),
  body("actualResult", "A bug must have an actual result").notEmpty(),
  body("actualResult", "The actual result must be a string").isString(),
  body("actualResult", "The actual result must be less than 250 characters").isLength({ max: 250 }).trim()
]

export default createBugValidator;