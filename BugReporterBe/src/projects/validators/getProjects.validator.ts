import { type ValidationChain, query } from "express-validator";

const getProjectValidator: ValidationChain[] = [
  query("limit", "limit must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("limit").default(5),
  query("page", "page must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("page").default(1)
]

export default getProjectValidator;