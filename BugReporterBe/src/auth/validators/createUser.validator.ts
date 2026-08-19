import { body, type Meta, matchedData } from "express-validator";
import hasValidField from "../../helpers/hasValidField.helper";
import mongoose from "mongoose";

const createUserValidator = [
  body("firstName", "First name is required, and must be a string").notEmpty().isString(),
  body("firstName", "First name cannot exceed 100 characters").isLength({ max: 100 }).trim(),
  body("lastName", "Last name must be a string").optional().isString(),
  body("lastName", "Last name cannot exceed 100 characters").isLength({ max: 100 }).trim(),
  body("email", "Email is required, and must be a valid email").notEmpty().isEmail(),
  body("email", "Email cannot exceed 200 characters").isLength({ max: 200 }).trim(),
  body("email").if((_value, meta: Meta) => { return hasValidField(meta, "email") }).custom(async (value: string, meta: Meta) => {
  
    const req = meta.req as Request;
    const cleanData = matchedData(req);
    const email = cleanData.email;

    const foundUser = await mongoose.model("User").countDocuments({ email: email }) > 0;
    if (foundUser) throw new Error("A user already exists for this email");
    
    return true;

  }),
  body("password", "Password must be 8 characters long").isLength({ min: 8 }).isString(),
  body("password", "Password must include at least one number, one uppercase letter, one lowercase letter and one special character`")
  .notEmpty()
  .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
]

export default createUserValidator;