const { User } = require("../models");

const registerController = async (req, res, next) => {
  return res.status(200).json({
    message: "User Registered Successfully",
  });
};

module.exports = {
  registerController,
};
