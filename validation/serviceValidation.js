const { body } = require("express-validator");

const createServiceValidationRules = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("price")
    .exists()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

const updateServiceValidationRules = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

module.exports = {
  createServiceValidationRules,
  updateServiceValidationRules,
};
