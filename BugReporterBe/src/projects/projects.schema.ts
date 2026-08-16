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