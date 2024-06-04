const CustomError = require('../utils/customError')
const { Service } = require('../models')

// create service
const createServiceService = async serviceData => {
  const { name, description, price } = serviceData

  if (!name || !description || !price) {
    throw new CustomError('Required all fields', 403)
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

module.exports = {
  createServiceService,
  updateService,
}
