const express = require("express");
const serviceController = require("../controller/serviceControllers");
const { validate } = require("../validation/index");
const {
  createServiceValidationRules,
  updateServiceValidationRules,
} = require("../validation/serviceValidation");

const router = express.Router();

router.post(
  "/create",
  validate(createServiceValidationRules),
  serviceController.createServiceController
);
router.put(
  "/:id",
  validate(updateServiceValidationRules),
  serviceController.updateServiceController
);
router.get("/getAll", serviceController.getAllServiceController);
router.get("/:id", serviceController.getServiceByIdController);
router.delete("/:id", serviceController.deleteServiceByIdController);

module.exports = router;
