const { createAddressService } = require("../service/addressServices");
const CustomError = require("../utils/customError");
const { successResponse, errorResponse } = require("../utils/response");

const createAddressController = async (req, res, next) => {
  try {
    const newAddress = await createAddressService(req.body);
    successResponse(res, newAddress, "Address created successfully", 201);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create address");
    }
  }
};

module.exports = {
  createAddressController,
};
