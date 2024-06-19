const { body } = require("express-validator");

const createUserValidationRules = [
  body("username").optional().notEmpty().withMessage("Username is required"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .isLength({ min: 12, max: 12 })
    .withMessage("Phone number must be 9 digits"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .exists()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
];

const updateUserValidationRules = [
  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),
  body("profileImage")
    .optional()
    .isURL()
    .withMessage("Invalid profile image URL"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .isLength({ min: 12, max: 12 })
    .withMessage("Phone number must be 9 digits"),
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty"),
];

const loginValidationRules = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .exists()
    .withMessage("Password is required"),
];

module.exports = {
  createUserValidationRules,
  updateUserValidationRules,
  loginValidationRules,
};
