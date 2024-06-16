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

const updateAddressService = async (id, addressData) => {
  const { userId } = addressData;
  const address = await Address.findByPk(id);
  if (!address) {
    throw new CustomError("Address not found", 404);
  }
  const user = await User.findByPk(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const updatedAddress = await address.update(addressData);
  return updatedAddress;
};

module.exports = {
  createAddressService,
  updateAddressService,
};
