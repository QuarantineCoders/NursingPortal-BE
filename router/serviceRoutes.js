const express = require("express");
const serviceController = require("../controller/serviceControllers");

const router = express.Router();

router.post("/create", serviceController.createServiceController);
router.put("/:id", serviceController.updateServiceController);
router.get("/getAll", serviceController.getAllServiceController);
router.get("/:id", serviceController.getServiceByIdController);
router.delete("/:id", serviceController.deleteServiceByIdController);

module.exports = router;
