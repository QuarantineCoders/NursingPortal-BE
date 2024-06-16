const { User } = require("../models");
const {
  createUserService,
  loginUserService,
  getAllUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
} = require("../service/userServices");
const CustomError = require("../utils/customError");
const { successResponse, errorResponse } = require("../utils/response");

const createUserController = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.user.id, req.body);
    successResponse(res, newUser, "User created successfully", 201);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create user");
    }
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { userWithoutPassword, token } = await loginUserService(req.body);
    successResponse(
      res,
      { user: userWithoutPassword, token },
      "User logged in successfully"
    );
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to login");
    }
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUserService();
    successResponse(res, users, "User fetched successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to fetch user");
    }
  }
};

const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    successResponse(res, user, "User fetched successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to fetch user");
    }
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const updatedUser = await updateUserByIdService(
      req.user.id,
      req.params.id,
      req.body
    );
    successResponse(res, updatedUser, "User updated successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to update user");
    }
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserByIdService(req.params.id);
    successResponse(res, null, "User deleted successfully", 200);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to delete user");
    }
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdService,
  deleteUserController,
};
