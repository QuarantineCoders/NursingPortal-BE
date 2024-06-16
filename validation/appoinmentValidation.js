const { body } = require("express-validator");

const createAppointmentValidationRules = [
  body("appointmentTime")
    .exists()
    .withMessage("Appointment time is required")
    .notEmpty()
    .withMessage("Appointment time cannot be empty"),
  body("appointmentDate")
    .exists()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .notEmpty()
    .withMessage("Appointment date cannot be empty"),
  body("patientName")
    .exists()
    .withMessage("Patient name is required")
    .isString()
    .withMessage("Invalid patient name")
    .notEmpty()
    .withMessage("Patient name cannot be empty"),
  body("patientAge")
    .exists()
    .withMessage("Patient age is required")
    .isInt({ min: 0 })
    .withMessage("Invalid patient age")
    .notEmpty()
    .withMessage("Patient age cannot be empty"),
  body("patientGender")
    .exists()
    .withMessage("Patient gender is required")
    .isIn(["male", "female"])
    .withMessage("Invalid patient gender")
    .notEmpty()
    .withMessage("Patient gender cannot be empty"),
  body("patientPhoneNumber")
    .exists()
    .withMessage("Patient phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .notEmpty()
    .withMessage("Patient phone number cannot be empty"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isIn(["upcoming", "completed", "cancelled"])
    .withMessage("Invalid status")
    .notEmpty()
    .withMessage("Status cannot be empty"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("addressId")
    .exists()
    .withMessage("Address ID is required")
    .isInt({ min: 0 })
    .withMessage("Invalid address ID")
    .notEmpty()
    .withMessage("Address ID cannot be empty"),
  body("services")
    .notEmpty()
    .withMessage("Appointment must have at least one service")
    .isArray()
    .withMessage("Services must be an array"),
  body("services.*.serviceId")
    .exists()
    .withMessage("Service ID is required")
    .isInt({ min: 0 })
    .withMessage("Invalid service ID")
    .notEmpty()
    .withMessage("Service ID cannot be empty"),
];

const updateAppointmentValidationRules = [
  body("appointmentTime")
    .optional()
    .isString()
    .withMessage("Invalid appointment time")
    .notEmpty()
    .withMessage("Appointment time cannot be empty"),
  body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format")
    .notEmpty()
    .withMessage("Appointment date cannot be empty"),
  body("patientName")
    .optional()
    .isString()
    .withMessage("Invalid patient name")
    .notEmpty()
    .withMessage("Patient name cannot be empty"),
  body("patientAge")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid patient age")
    .notEmpty()
    .withMessage("Patient age cannot be empty"),
  body("patientGender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Invalid patient gender")
    .notEmpty()
    .withMessage("Patient gender cannot be empty"),
  body("patientPhoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number")
    .notEmpty()
    .withMessage("Patient phone number cannot be empty"),
  body("status")
    .optional()
    .isIn(["upcoming", "completed", "cancelled"])
    .withMessage("Invalid status")
    .notEmpty()
    .withMessage("Status cannot be empty"),
  body("description")
    .optional()
    .isString()
    .withMessage("Invalid description")
    .notEmpty()
    .withMessage("Description cannot be empty"),
  body("addressId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid address ID")
    .notEmpty()
    .withMessage("Address ID cannot be empty"),
  body("services")
    .optional()
    .isArray()
    .withMessage("Services must be an array")
    .notEmpty()
    .withMessage("Services array cannot be empty"),
  body("services.*.serviceId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid service ID")
    .notEmpty()
    .withMessage("Service ID cannot be empty"),
  body("services.*.tools")
    .optional()
    .isArray()
    .withMessage("Tools must be an array")
    .notEmpty()
    .withMessage("Tools array cannot be empty"),
  body("services.*.tools.*.toolId")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid tool ID")
    .notEmpty()
    .withMessage("Tool ID cannot be empty"),
  body("services.*.tools.*.quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Invalid quantity")
    .notEmpty()
    .withMessage("Quantity cannot be empty"),
];

module.exports = {
  createAppointmentValidationRules,
  updateAppointmentValidationRules,
};
