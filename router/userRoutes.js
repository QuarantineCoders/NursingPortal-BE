const express = require("express");
const userController = require("../controller/userControllers");
const verifyUserToken = require("../middleware/verifyUserToken");
const { validate } = require("../validation");

const {
  createUserValidationRules,
  loginValidationRules,
  updateUserValidationRules,
} = require("../validation/userValidation");
const router = express.Router();

router.post(
  "/create",
  validate(createUserValidationRules),
  userController.createUserController
);
router.post(
  "/login",
  validate(loginValidationRules),
  userController.loginUserController
);
router.get("/getAll", userController.getAllUsersController);
router.get("/:id", userController.getUserByIdController);
router.put(
  "/:id",
  verifyUserToken,
  validate(updateUserValidationRules),
  userController.updateUserController
);
router.delete("/:id", verifyUserToken, userController.deleteUserController);

module.exports = router;
