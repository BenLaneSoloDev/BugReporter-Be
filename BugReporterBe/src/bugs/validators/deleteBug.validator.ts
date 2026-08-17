import { param, ValidationChain } from "express-validator";

const deleteBugValidator: ValidationChain[] = [
  param("bugId", "A BugID must be provided to delete a bug").notEmpty().isMongoId()
]

export default deleteBugValidator;