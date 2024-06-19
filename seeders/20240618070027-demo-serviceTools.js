"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const { Service, Tool } = require("../models");

    // Fetch service and tool IDs
    const services = await Service.findAll({ attributes: ["id"] });
    const tools = await Tool.findAll({ attributes: ["id"] });

    const serviceIds = services.map((service) => service.id);
    const toolIds = tools.map((tool) => tool.id);

    // services have multiple tools, and each services has atleast one tool
    const serviceTools = [
      {
        serviceId: serviceIds[0],
        toolId: toolIds[0],
      },
      {
        serviceId: serviceIds[0],
        toolId: toolIds[1],
      },
      {
        serviceId: serviceIds[1],
        toolId: toolIds[2],
      },
      {
        serviceId: serviceIds[1],
        toolId: toolIds[3],
      },
      {
        serviceId: serviceIds[2],
        toolId: toolIds[4],
      },
      {
        serviceId: serviceIds[2],
        toolId: toolIds[5],
      },

      {
        serviceId: serviceIds[3],
        toolId: toolIds[6],
      },
      {
        serviceId: serviceIds[3],
        toolId: toolIds[8],
      },
      {
        serviceId: serviceIds[4],
        toolId: toolIds[5],
      },
      {
        serviceId: serviceIds[5],
        toolId: toolIds[7],
      },
      {
        serviceId: serviceIds[6],
        toolId: toolIds[6],
      },
      {
        serviceId: serviceIds[7],
        toolId: toolIds[9],
      },
      {
        serviceId: serviceIds[8],
        toolId: toolIds[7],
      },
      {
        serviceId: serviceIds[9],
        toolId: toolIds[8],
      },
    ];

    // Insert seed data into ServiceTools table
    await queryInterface.bulkInsert(
      "ServiceTools",
      serviceTools.map((st) => ({
        ...st,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove all seeded data from ServiceTools table
    await queryInterface.bulkDelete("ServiceTools", null, {});
  },
};
