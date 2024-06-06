const express = require("express");
const toolController = require("../controller/toolController");

const router = express.Router();

router.post("/create", toolController.createToolController);
router.put("/:id", toolController.updateToolController);

module.exports = router;
