import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // The model this ID will map to
    required: [true, "Projects must be linked to a user"]
  },
  title: {
    type: String,
    required: [true, "Project must have a title"],
    trim: true,
    maxLength: [100, "Project title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, "Project description cannot exceed 500 characters"]
  },
  developmentAreas: {
    type: [String],
    required: [true, "Project must have development areas (e.g. UI, UX, API etc)"],
  },
  environments: {
    type: [String],
    required: [true, "Project must have environments(e.g. Windows/Linux, Google/Safari etc)"],
  },
}, { timestamps: true, versionKey: false });

const Project = model("Project", projectSchema);
export default Project;          

/**
 * @openapi
 * components:
 *  schemas:
 *    Project:
 *      type: object
 *      required:
 *        - user
 *        - title
 *        - developmentAreas
 *        - environments
 *      properties:
 *        user:
 *          type: string
 *          description: UserID associated with the project
 *        title:
 *          type: string
 *          description: Title of the project
 *          maxLength: 100
 *        description:
 *          type: string
 *          description: Description of the project
 *          maxLength: 500
 *        developmentAreas:
 *          type: array
 *          description: The different development areas within the project
 *          minItems: 1
 *          items:
 *            type: string
 *        environments:
 *          type: array
 *          description: The different environments used within the project
 *          minItems: 1
 *          items:
 *            type: string
 *      example: 
 *        user: 6a845eb02c838ff1505078cc
 *        title: Fighting Game
 *        description: Mini arcade duelling button masher
 *        developmentAreas: [UI, Combat, Environment]
 *        environments: [Windows, Mac]    
 */