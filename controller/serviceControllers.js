const {
  createServiceService,
  updateService,
  getServiceByIdService,
  getAllService,
  deleteServiceByIdService,
} = require('../service/serviceServices')
const CustomError = require('../utils/customError')
const { errorResponse, successResponse } = require('../utils/response')

// Create service
const createServiceController = async (req, res, next) => {
  try {
    const newService = await createServiceService(req.body)
    successResponse(res, newService, 'Service created successfully', 201)
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode)
    } else {
      errorResponse(res, error.message, 'Failed to create service')
    }
  }
}

// update service
const updateServiceController = async (req, res, next) => {
  try {
    const updatedService = await updateService(req.params.id, req.body)
    successResponse(res, updatedService, 'Service updated successfully', 200)
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode)
    } else {
      errorResponse(res, error.message, 'Failed to update service')
    }
  }
}

const getServiceByIdController = async (req, res, next) => {
  try {
    const service = await getServiceByIdService(req.params.id)
    successResponse(res, service, 'Service fetched successfully', 200)
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode)
    } else {
      errorResponse(res, error.message, 'Failed to fetch service')
    }
  }
}

// get all services
const getAllServiceController = async (req, res, next) => {
  try {
    const services = await getAllService()
    successResponse(res, services, 'User fetched successfully', 200)
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode)
    } else {
      errorResponse(res, error.message, 'Failed to fetch service')
    }
  }
}

// delete service
const deleteServiceByIdController = async (req, res, next) => {
  try {
    await deleteServiceByIdService(req.params.id)
    successResponse(res, null, 'Service deleted successfully', 200)
  } catch (error) {
    if (error instanceof CustomError) {
      errorResponse(res, error.message, error.message, error.statusCode)
    } else {
      errorResponse(res, error.message, 'Failed to delete service')
    }
  }
}

module.exports = {
  createServiceController,
  updateServiceController,
  getServiceByIdController,
  getAllServiceController,
  deleteServiceByIdController,
}
