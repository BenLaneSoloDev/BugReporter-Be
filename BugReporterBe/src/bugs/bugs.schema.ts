import type { ObjectId } from "mongoose";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const bugSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project", // The model this ID will map to
    required: [true, "Bug must be linked to a Project"]
  },
  title: {
    type: String,
    required: [true, "Bug must have a title"],
    trim: true,
    maxLength: [100, "Title cannot exceed 100 characters"]
  },
  developmentArea: {
    type: String,
    required: [true, "Bug must have a development area"],
    trim: true,
    validate: {
      validator: async function (this: { project?: ObjectId }, value: String) {
        if (!this.project) return false;
        const foundProject = await mongoose.model("Project").findById(this.project).select("developmentAreas");
        if (!foundProject) return false;
        return foundProject.developmentAreas?.includes(value)  ?? false;
      },
      message: ({ value } : { value: String }) => `${value} is not a valid development area for this project`
    },
  },
  severity: {
    type: String,
    required: [true, "Bugs must have a severity"],
    enum: ["low", "normal", "high", "extreme"],
    default: "normal"
  },
  stepsToReproduce: {
    type: [{
      type: String,
      maxLength: [100, "Each step for reproduction must be less than 100 characters"],
      trim: true
    }],
    required: [true, "Bugs must contain steps to reproduce"],
    validate: {
      validator: function (value: [String]) {
        return value.length <= 10 && value; // Allows Only 10 Steps in a bug, and each cannot exceed 100
      },
      message: () => "Cannot have more than 10 steps for reproduction"
    },
  },
  environmentsUsed: {
    type: [String],
    required: [true, "Bugs must contain environment details"],
    validate: {
      validator: async function (this: { project?: ObjectId}, value: [String]) {
        if (!this.project) return false;
        const foundProject = await mongoose.model("Project").findById(this.project).select("environments");
        if (!foundProject) return false;

        let validEnvironment = true;
        for(let i: number = 0; i < value.length; i++) {
          validEnvironment = foundProject.environements?.includes(value[i]);
          if (!validEnvironment) break;
        }

        return validEnvironment;
      },
      message: ({ value } : { value: [String] }) => `${value} is not a valid environement setup for this project`
    },
  },
  expectedResult: {
    type: String,
    required: [true, "Bug must have an expected result"],
    trim: true,
    maxLength: [250, "Expected result cannot exceed 250 characters"]
  },
  actualResult: {
    type: String,
    required: [true, "Bug must have an actual result"],
    trim: true,
    maxLength: [250, "Actual result cannot exceed 250 characters"]
  },  
}, { timestamps: true, versionKey: false });

const Bug = model("Bug", bugSchema);
export default Bug;