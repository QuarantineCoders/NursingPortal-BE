const CustomError = require('../utils/customError')
const { Service } = require('../models')

const createServiceService = async serviceData => {
  const { name, description, price } = serviceData

  if (!name || !description || !price) {
    throw new CustomError('Required all fields', 403)
  }

  const newService = await Service.create({ name, description, price })

  return { service: newService.dataValues }
}

module.exports = {
  createServiceService,
}
