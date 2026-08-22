import { Schema, model } from "mongoose";

interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxLength: [100, "First name can not be more than 100 characters"]
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxLength: [100, "Last name can not be more than 100 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is  required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email: String) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.toString());
      },
      message: () => `Please enter a valid email address`
    }
  },
  password: {
    type: String,
    required: [true, "Password is  required"],
  }
}, { timestamps: true, versionKey: false });

const User = model("User", userSchema);
export {
  IUser,
  User
};

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstName
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *          description: First name of the user
 *          maxLength: 100
 *        lastName:
 *          type: string
 *          description: Last name of the user
 *          maxLength: 100
 *        email:
 *          type: string
 *          description: Valid email address of the user
 *        password:
 *          type: string
 *          description: User password that must contain 8 characters, a number, a capital letter and a special character
 *      example: 
 *        firstName: John
 *        lastName: Smith
 *        email: JohnSmith@gmail.com
 *        password: Password123?
 */