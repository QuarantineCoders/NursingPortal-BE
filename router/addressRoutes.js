const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressControllers");
const verifyUserToken = require("../middleware/verifyUserToken");

router.post(
  "/create",
  verifyUserToken,
  addressController.createAddressController
);

router.put("/:id", verifyUserToken, addressController.updateAddressController);

module.exports = router;
