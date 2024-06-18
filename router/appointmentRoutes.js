const express = require("express");
const appointmentController = require("../controller/appointmentController");
const verifyUserToken = require("../middleware/verifyUserToken");
const { validate } = require("../validation");
const {
  createAppointmentValidationRules,
  updateAppointmentValidationRules,
} = require("../validation/appoinmentValidation");

const router = express.Router();

router.post(
  "/create",
  verifyUserToken,
  validate(createAppointmentValidationRules),
  appointmentController.createAppointmentController
);
router.get(
  "/getAll",
  verifyUserToken,
  appointmentController.getAppointmentController
);
router.get(
  "/getUserAppointments",
  verifyUserToken,
  appointmentController.getUserAppointmentsController
);
router.get(
  "/:id",
  verifyUserToken,
  appointmentController.getAppointmentByIdController
);
router.put(
  "/:id",
  verifyUserToken,
  validate(updateAppointmentValidationRules),
  appointmentController.updateAppointmentController
);
router.delete(
  "/:id",
  verifyUserToken,
  appointmentController.deleteAppointmentController
);

module.exports = router;
