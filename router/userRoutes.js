const express = require("express");
const userController = require("../controller/userControllers");
const router = express.Router();

router.post("/register", userController.registerController);

module.exports = router;
