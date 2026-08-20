import { param, query, ValidationChain, type Meta, matchedData } from "express-validator";
import hasValidField from "../../helpers/hasValidField.helper";
import mongoose from "mongoose";

const getBugsValidator: ValidationChain[] = [
  param("projectId", "A valid ProjectID must be used").optional().isMongoId(),
  param("projectId").if((_value, meta: Meta) => { return hasValidField(meta, "projectId") }).custom(async (_value, meta: Meta) => 
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const projectId = cleanData.projectId;

      const projectExists = await mongoose.model("Project").exists({ _id: projectId });
      if (!projectExists) throw new Error("No Project exists for the provided ProjectID");
      return true;
    }
  ),
  query("limit", "limit must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("limit").default(5),
  query("page", "page must be a valid integer").optional().isInt({ min: 1 }).toInt(),
  query("page").default(1)
]

export default getBugsValidator;