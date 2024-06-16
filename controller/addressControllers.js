const {
  createAddressService,
  updateAddressService,
} = require("../service/addressServices");
const CustomError = require("../utils/customError");
const { successResponse, errorResponse } = require("../utils/response");

const createAddressController = async (req, res, next) => {
  try {
    const newAddress = await createAddressService(req.user.id, req.body);
    successResponse(res, newAddress, "Address successfully created", 201);

  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create address");
    }
  }
};

const updateAddressController = async (req, res, next) => {
  try {
    const updatedAddress = await updateAddressService(req.user.id,req.params.id, req.body);
    successResponse(res, updatedAddress, "Address updated successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to update address");
    }
  }
};

module.exports = {
  createAddressController,
  updateAddressController,
};
