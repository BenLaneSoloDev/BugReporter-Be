import { body, type Meta, matchedData } from "express-validator"; 
import hasValidField from "../../helpers/hasValidField.helper";
import mongoose from "mongoose";

const createProjectValidator = [
  body("title", "The title cannot be empty").notEmpty(),
  body("title", "The title must be a string").isString(),
  body("title", "The title must be less than 100 characters").isLength({ max: 100 }).trim(),
  body("description").optional(),
  body("description", "The description must be a string").isString(),
  body("description", "The description must be less than 500 characters").isLength({ max: 500 }).trim(),
  body("developmentAreas", "Development areas must be an array and have at least one entry").isArray({ min: 1 }),
  body("developmentAreas.*", "Development areas must be strings").isString().trim(),
  body("environments", "Environments must be an array and have at least one entry").isArray({ min: 1}),
  body("environments.*", "Environments must be strings").isString().trim(),
]

export default createProjectValidator;