import { param, query, ValidationChain } from "express-validator";

const getBugsValidator: ValidationChain[] = [
  param("projectId", "A valid ProjectID must be used").optional().isMongoId(),
  query("limit", "limit must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("limit").default(5),
  query("page", "page must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("page").default(1)
]

export default getBugsValidator;