const express = require("express");
const toolController = require("../controller/toolController");
const { validate } = require("../validation");
const {
  createToolValidationRules,
  updateToolValidationRules,
} = require("../validation/toolValidation");

const router = express.Router();

router.post(
  "/create",
  // validate(createToolValidationRules),
  toolController.createToolController
);
router.put(
  "/:id",
  validate(updateToolValidationRules),
  toolController.updateToolController
);
router.get("/getAll", toolController.getAllToolController);
router.get("/:id", toolController.getToolByIdController);
router.delete("/:id", toolController.deleteToolByIdController);

module.exports = router;
