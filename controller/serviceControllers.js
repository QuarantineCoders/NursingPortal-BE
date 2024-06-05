const {
  createServiceService,
  updateService,
} = require("../service/serviceServices");
const CustomError = require("../utils/customError");
const { errorResponse, successResponse } = require("../utils/response");

const createServiceController = async (req, res, next) => {
  try {
    const newService = await createServiceService(req.body);
    successResponse(res, newService, "Service created successfully", 201);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create service");
    }
  }
};

const updateServiceController = async (req, res, next) => {
  try {
    const updatedService = await updateService(req.params.id, req.body);
    successResponse(res, updatedService, "Service updated successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to update service");
    }
  }
};

module.exports = {
  createServiceController,
  updateServiceController,
};
