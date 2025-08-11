// src/validations/patient.validation.js
const { body } = require("express-validator");

const createPatientValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("age").isInt({ min: 0 }).withMessage("Age must be a non-negative integer"),
  body("gender").isIn(["male", "female"]).withMessage("Gender must be 'male' or 'female'"),
  body("address").notEmpty().withMessage("Address is required"),
  
];

const updatePatientValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer"),
  body("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Gender must be 'male' or 'female'"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
];

module.exports = {
  createPatientValidation,
  updatePatientValidation,
};
