import { body } from "express-validator";

const loginUserValidator = [
  body("email", "Email is required, and must be a valid email").notEmpty().isEmail(),
  body("email", "Email cannot exceed 200 characters").isLength({ max: 200 }).trim(),
  body("password", "Password must be 8 characters long").isLength({ min: 8 }).isString(),
]

export default loginUserValidator;