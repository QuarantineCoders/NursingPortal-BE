const CustomError = require('../utils/customError')
const { Service } = require('../models')

// create service
const createServiceService = async serviceData => {
  const { name, description, price } = serviceData

  if (!name || !description || !price) {
    throw new CustomError('Required all fields', 422)
  }

  const newService = await Service.create({ name, description, price })

  return { service: newService.dataValues }
}

// Update service
const updateService = async (id, serviceData) => {
  const { name, description, price } = serviceData
  const service = await Service.findByPk(id)

  if (!service) {
    throw new CustomError('Service not found', 404)
  }
  const updatedService = await service.update({ name, description, price })
  return updatedService
}

// get service by id
const getServiceByIdService = async id => {
  const service = await Service.findByPk(id)
  if (!service) {
    throw new CustomError('Service not found', 404)
  }

  return service
}

// get all service
const getAllService = async () => {
  const services = await Service.findAll()
  if (!services) {
    throw new CustomError('No services found', 404)
  }

  return services
}

// Delete service
const deleteServiceByIdService = async id => {
  const service = await Service.findByPk(id)
  if (!service) {
    throw new CustomError('Service not found', 404)
  }
  console.log(service)
  await service.destroy()
  return service
}

module.exports = {
  createServiceService,
  updateService,
  getServiceByIdService,
  getAllService,
  deleteServiceByIdService,
}
