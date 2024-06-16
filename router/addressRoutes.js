const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressControllers");
const verifyUserToken = require("../middleware/verifyUserToken");
const { validate } = require("../validation");
const {
  createAddressValidationRules,
  updateAddressValidationRules,
} = require("../validation/addressValidation");

router.post(
  "/create",
  verifyUserToken,
  validate(createAddressValidationRules),
  addressController.createAddressController
);

router.put(
  "/:id",
  verifyUserToken,
  validate(updateAddressValidationRules),
  addressController.updateAddressController
);

module.exports = router;
