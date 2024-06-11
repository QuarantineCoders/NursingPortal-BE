const {
  createAppointmentService,
  getAllAppointmentService,
  getUserAppointmentsService,
  getAppointmentByIdService,
  updateAppointmentService,
  deleteAppointmentService,
} = require("../service/appointmentService");
const CustomError = require("../utils/customError");
const { successResponse, errorResponse } = require("../utils/response");

const createAppointmentController = async (req, res, next) => {
  try {
    const appointment = await createAppointmentService(req.body);
    successResponse(res, appointment, "Appointment created successfully", 201);
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode);
    } else {
      errorResponse(res, error.message, "Failed to create appointment");
    }
  }
};

const getAppointmentController = async (req, res, next) => {
  try {
    const appointments = await getAllAppointmentService();
    successResponse(
      res,
      appointments,
      "Appointments retrieved successfully",
      200
    );
  } catch (error) {
    errorResponse(res, error.message, "Failed to retrieve appointments");
  }
};

const getUserAppointmentsController = async (req, res, next) => {
  try {
    const appointments = await getUserAppointmentsService(req.user.id);
    successResponse(
      res,
      appointments,
      "User appointments retrieved successfully",
      200
    );
  } catch (error) {
    errorResponse(res, error.message, "Failed to retrieve user appointments");
  }
};

const getAppointmentByIdController = async (req, res, next) => {
  try {
    const appointment = await getAppointmentByIdService(req.params.id);
    successResponse(
      res,
      appointment,
      "Appointment retrieved successfully",
      200
    );
  } catch (error) {
    errorResponse(res, error.message, "Failed to retrieve appointment");
  }
};
const updateAppointmentController = async (req, res, next) => {
  try {
    const appointment = await updateAppointmentService(req.params.id, req.body);
    successResponse(res, appointment, "Appointment updated successfully", 200);
  } catch (error) {
    errorResponse(res, error.message, "Failed to update appointment");
  }
};

const deleteAppointmentController = async (req, res, next) => {
  try {
    const appointment = await deleteAppointmentService(req.params.id);
    successResponse(res, appointment, "Appointment deleted successfully", 200);
  } catch (error) {
    errorResponse(res, error.message, "Failed to delete appointment");
  }
};

module.exports = {
  createAppointmentController,
  getAppointmentController,
  getUserAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController,
};
