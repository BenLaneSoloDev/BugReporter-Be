import mongoose from "mongoose";
import { body, param, type Meta, matchedData } from "express-validator"; 
import hasValidField from "../../helpers/hasValidField.helper";

const deleteProjectValidator = [
  param("projectId", "Valid project ID must be provided").notEmpty().isMongoId(),
  param("projectId").if((_value, meta: Meta) => { return hasValidField(meta, "projectId") }).custom(async (_value, meta: Meta) => 
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const projectId = cleanData.projectId;

      const projectExists = await mongoose.model("Project").exists({ _id: projectId });
      if (!projectExists) throw new Error("No Project exists for the provided ProjectID");
      return true;
    }
  )
]

export default deleteProjectValidator;