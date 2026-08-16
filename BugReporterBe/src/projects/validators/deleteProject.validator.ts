import { body, param } from "express-validator"; 

const deleteProjectValidator = [
  param("projectId", "Valid project ID must be provided").notEmpty().isMongoId()
]

export default deleteProjectValidator;