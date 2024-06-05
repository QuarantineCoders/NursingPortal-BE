const {
  createToolService,
  updateToolService,
} = require("../service/toolServices");
const CustomError = require("../utils/customError");
const { successResponse, errorResponse } = require("../utils/response");

const createToolController = async (req, res, next) => {
  try {
    const newTool = await createToolService(req.body);
    successResponse(res, newTool, "Tool created successfully", 201);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create tool");
    }
  }
};

const updateToolController = async (req, res, next) => {
  try {
    const updatedTool = await updateToolService(req.params.id, req.body);
    successResponse(res, updatedTool, "Tool updated successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to update tool");
    }
  }
};

module.exports = {
  createToolController,
  updateToolController,
};
