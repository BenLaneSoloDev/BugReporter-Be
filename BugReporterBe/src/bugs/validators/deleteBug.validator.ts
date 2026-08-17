import mongoose from "mongoose";
import { param, ValidationChain, matchedData, type Meta, validationResult, type ValidationError } from "express-validator";
import hasValidField from "../../helpers/hasValidField.helper";

const deleteBugValidator: ValidationChain[] = [
  param("bugId", "A BugID must be provided to delete a bug").notEmpty().isMongoId(),
  param("bugId").if((_value, meta: Meta) => { return hasValidField(meta, "bugId") }).custom(async (_value, meta: Meta) => 
    {
      const req = meta.req as Request;

      const cleanData = matchedData(req);
      const bugId = cleanData.bugId;

      const bugExists = await mongoose.model("Bug").exists({ _id: bugId });
      if (!bugExists) throw new Error("No Bug exists for the provided BugID");
      return true;
    }
  )
]

export default deleteBugValidator;