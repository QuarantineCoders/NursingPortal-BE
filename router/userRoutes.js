const express = require("express");
const userController = require("../controller/userControllers");
const verifyUserToken = require("../middleware/verifyUserToken");
const router = express.Router();

router.post("/create", userController.createUserController);
router.post("/login", userController.loginUserController);

module.exports = router;
