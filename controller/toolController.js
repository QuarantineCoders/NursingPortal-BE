const { get } = require("../router/serviceRoutes");
const {
  createToolService,
  updateToolService,
  getAllTool,
  getToolByIdService,
  deleteToolByIdService,
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

const getAllToolController = async (req, res, next) => {
  try {
    const tools = await getAllTool();
    successResponse(res, tools, "Tool fetched successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to fetch tool");
    }
  }
};

const getToolByIdController = async (req, res, next) => {
  try {
    const tool = await getToolByIdService(req.params.id);
    successResponse(res, tool, "Tool fetched successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to fetch tool");
    }
  }
};

const deleteToolByIdController = async (req, res, next) => {
  try {
    const tool = await deleteToolByIdService(req.params.id);
    successResponse(res, tool, "Tool deleted successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to delete tool");
    }
  }
};

module.exports = {
  createToolController,
  updateToolController,
  getAllToolController,
  getToolByIdController,
  deleteToolByIdController,
};
