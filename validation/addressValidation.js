const { body } = require("express-validator");

const createAddressValidationRules = [
  body("province")
    .exists()
    .withMessage("Province is required")
    .isString()
    .withMessage("Invalid province")
    .notEmpty()
    .withMessage("Province cannot be empty"),
  body("city")
    .exists()
    .withMessage("City is required")
    .isString()
    .withMessage("Invalid city")
    .notEmpty()
    .withMessage("City cannot be empty"),
  body("district")
    .exists()
    .withMessage("District is required")
    .isString()
    .withMessage("Invalid district")
    .notEmpty()
    .withMessage("District cannot be empty"),
  body("street")
    .exists()
    .withMessage("Street is required")
    .isString()
    .withMessage("Invalid street")
    .notEmpty()
    .withMessage("Street cannot be empty"),
  body("label")
    .exists()
    .withMessage("Label is required")
    .isString()
    .withMessage("Invalid label")
    .notEmpty()
    .withMessage("Label cannot be empty"),
  body("latitude")
    .exists()
    .withMessage("Latitude is required")
    .isFloat()
    .withMessage("Invalid latitude")
    .notEmpty()
    .withMessage("Latitude cannot be empty"),
  body("longitude")
    .exists()
    .withMessage("Longitude is required")
    .isFloat()
    .withMessage("Invalid longitude")
    .notEmpty()
    .withMessage("Longitude cannot be empty"),
];

const updateAddressValidationRules = [
  body("province")
    .optional()
    .isString()
    .withMessage("Invalid province")
    .notEmpty()
    .withMessage("Province cannot be empty"),
  body("city")
    .optional()
    .isString()
    .withMessage("Invalid city")
    .notEmpty()
    .withMessage("City cannot be empty"),
  body("district")
    .optional()
    .isString()
    .withMessage("Invalid district")
    .notEmpty()
    .withMessage("District cannot be empty"),
  body("street")
    .optional()
    .isString()
    .withMessage("Invalid street")
    .notEmpty()
    .withMessage("Street cannot be empty"),
  body("label")
    .optional()
    .isString()
    .withMessage("Invalid label")
    .notEmpty()
    .withMessage("Label cannot be empty"),
  body("latitude")
    .optional()
    .isFloat()
    .withMessage("Invalid latitude")
    .notEmpty()
    .withMessage("Latitude cannot be empty"),
  body("longitude")
    .optional()
    .isFloat()
    .withMessage("Invalid longitude")
    .notEmpty()
    .withMessage("Longitude cannot be empty"),
];

module.exports = {
  createAddressValidationRules,
  updateAddressValidationRules,
};
