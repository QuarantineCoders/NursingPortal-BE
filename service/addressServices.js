const { Address, User } = require("../models");
const CustomError = require("../utils/customError");

const createAddressService = async (addressData) => {
  const { userId } = addressData;
  const user = await User.findByPk(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const newAddress = await Address.create(addressData);
  return newAddress;
};

module.exports = {
  createAddressService,
};
