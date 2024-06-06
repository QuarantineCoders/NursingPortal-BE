const CustomError = require("../utils/customError");
const { Service, Tool, sequelize } = require("../models");

const createServiceService = async (serviceData) => {
  const { name, description, price } = serviceData;

  if (!name || !description || !price) {
    throw new CustomError("Required all fields", 422);
  }

  const newService = await Service.create({ name, description, price });

  return { service: newService.dataValues };
};

const updateService = async (id, serviceData) => {
  const { name, description, price } = serviceData;
  const service = await Service.findByPk(id);

  if (!service) {
    throw new CustomError("Service not found", 404);
  }
  const updatedService = await service.update({ name, description, price });
  return updatedService;
};

const getServiceByIdService = async (id) => {
  const service = await Service.findByPk(id, {
    include: { association: "tools" },
  });
  if (!service) {
    throw new CustomError("Service not found", 404);
  }

  return service;
};

const getAllService = async () => {
  const services = await Service.findAll({
    include: { association: "tools" },
  });
  if (!services) {
    throw new CustomError("No services found", 404);
  }

  return services;
};

const deleteServiceByIdService = async (serviceId) => {
  const transaction = await sequelize.transaction();

  try {
    const service = await Service.findByPk(serviceId, { transaction });

    if (!service) {
      throw new CustomError("Service not found", 404);
    }

    const tools = await service.getTools({ transaction });

    await service.removeTools(tools, { transaction });

    await service.destroy({ transaction });

    for (const tool of tools) {
      const relatedServices = await tool.getServices({ transaction });
      if (relatedServices.length === 0) {
        await tool.destroy({ transaction });
      }
    }

    await transaction.commit();
    return { message: "Service and related tools deleted successfully" };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  createServiceService,
  updateService,
  getServiceByIdService,
  getAllService,
  deleteServiceByIdService,
};
