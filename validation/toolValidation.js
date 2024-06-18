const { body } = require("express-validator");

const createToolValidationRules = [
  body("serviceIds")
    .exists()
    .withMessage("Service IDs are required")
    .isArray()
    .withMessage("Service IDs must be an array")
    .notEmpty()
    .withMessage("Service IDs array cannot be empty")
    .bail()
    .custom((serviceIds) => {
      // Check that all elements in serviceIds are integers
      if (!serviceIds.every(Number.isInteger)) {
        throw new Error("Service IDs must be an array of integers");
      }
      return true;
    }),
  body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("price")
    .exists()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

const updateToolValidationRules = [
  body("serviceIds")
    .optional()
    .isArray()
    .withMessage("Service IDs must be an array")
    .notEmpty()
    .withMessage("Service IDs array cannot be empty")
    .bail()
    .custom((serviceIds) => {
      if (!serviceIds.every(Number.isInteger)) {
        throw new Error("Service IDs must be an array of integers");
      }
      return true;
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

module.exports = {
  createToolValidationRules,
  updateToolValidationRules,
};
