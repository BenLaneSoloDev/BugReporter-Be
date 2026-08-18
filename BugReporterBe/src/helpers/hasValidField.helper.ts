import { type Meta, type ValidationError, validationResult} from "express-validator";

function hasValidField(meta: Meta, field: string): boolean
{ 
  const req = meta.req as Request;
  const idError = validationResult(req).array().some((err: ValidationError) => err.type === "field" && err.path === field);
  console.log(validationResult(req), "No Errors", !idError);
  return !idError;
}

export default hasValidField;