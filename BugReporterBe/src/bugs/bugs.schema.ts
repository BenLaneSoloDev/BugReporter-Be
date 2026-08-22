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

/**
 * @openapi
 * components:
 *  schemas:
 *    Bug:
 *      type: object
 *      required:
 *        - project
 *        - title
 *        - developmentArea
 *        - severity
 *        - stepsToReproduce
 *        - environmentsUsed
 *        - expectedResult
 *        - actualResult
 *      properties:
 *        project:
 *          type: string
 *          description: First name of the user
 *          maxLength: 100
 *        title:
 *          type: string
 *          description: Last name of the user
 *          maxLength: 100
 *        developmentArea:
 *          type: string
 *          description: "A valid development area of the project that this bug linked to (I.E. Project Schema: developmentAreas)"
 *          example: ["UI"]
 *        severity:
 *          type: string
 *          description: The importance of getting this bug fixed
 *          enum: ["low", "normal", "high", "extreme"]
 *        stepsToReproduce:
 *          type: array
 *          description: The list of steps involved in having this bug occur
 *          maxItems: 10
 *          items:
 *            type: string
 *            maxLength: 100
 *        environmentsUsed:
 *          type: array
 *          description: "Valid development environments that this bug occurs in for the linked project (I.E. Project Schema: environments)"
 *          example: ["Windows", "Mac"]   
 *          minItems: 1
 *          items:
 *            type: string
 *        expectedResult:
 *          type: string
 *          description: What should be happening with this part of the project
 *          maxLength: 250  
 *        actualResult:
 *          type: string
 *          description: What is actually happening with this part of the project (the bug)
 *          maxLength: 250        
 *      example: 
 *        firstName: John
 *        lastName: Smith
 *        email: JohnSmith@gmail.com
 *        password: Password123?
 */