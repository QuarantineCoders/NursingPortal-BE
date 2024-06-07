const express = require("express");
const toolController = require("../controller/toolController");

const router = express.Router();

router.post("/create", toolController.createToolController);
router.put("/:id", toolController.updateToolController);
router.get("/getAll", toolController.getAllToolController);
router.get("/:id", toolController.getToolByIdController);
router.delete("/:id", toolController.deleteToolByIdController);

module.exports = router;
