export {};
const { body, param } = require("express-validator"); 

const deleteProjectValidator = [
  param("projectId", "Valid project ID must be provided").notEmpty().isMongoId()
]

module.exports = deleteProjectValidator;