const { Tool, Service } = require("../models");
const CustomError = require("../utils/customError");

const createToolService = async (toolData) => {
  const { serviceIds, name, price, quantity } = toolData;

  const transaction = await Tool.sequelize.transaction();

  const newTool = await Tool.create({ name, price, quantity }, { transaction });

  if (!newTool) {
    throw new CustomError("Failed to create tool", 500);
  }

  if (Array.isArray(serviceIds) && serviceIds.length > 0) {
    const services = await Service.findAll({
      where: { id: serviceIds },
      transaction,
    });

    if (services.length !== serviceIds.length) {
      await transaction.rollback();
      throw new CustomError("One or more service IDs are invalid", 400);
    }

    await newTool.setServices(serviceIds, { transaction });
  }

  await transaction.commit();
  return newTool;
};

const updateToolService = async (id, toolData) => {
  const { serviceIds, name, price, quantity } = toolData;

  const tool = await Tool.findByPk(id);

  if (!tool) {
    throw new CustomError("Tool not found", 404);
  }

  const transaction = await Tool.sequelize.transaction();

  await tool.update({ name, price, quantity }, { transaction });

  if (Array.isArray(serviceIds) && serviceIds.length > 0) {
    const services = await Service.findAll({
      where: { id: serviceIds },
      transaction,
    });

    if (services.length !== serviceIds.length) {
      await transaction.rollback();
      throw new CustomError("One or more service IDs are invalid", 400);
    }

    await tool.setServices(serviceIds, { transaction });
  }

  await transaction.commit();
  return tool;
};

module.exports = {
  createToolService,
  updateToolService,
};
