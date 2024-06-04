const express = require("express");
const userController = require("../controller/userControllers");
const verifyUserToken = require("../middleware/verifyUserToken");
const router = express.Router();

router.post("/create", userController.createUserController);
router.post("/login", userController.loginUserController);
router.get("/getAll", userController.getAllUsersController);
router.get("/:id", userController.getUserByIdController);
router.put("/:id", verifyUserToken, userController.updateUserController);
router.delete("/:id", verifyUserToken, userController.deleteUserController);

module.exports = router;
