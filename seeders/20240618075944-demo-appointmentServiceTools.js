"use strict";

const {
  AppointmentServiceTool,
  AppointmentService,
  ServiceTool,
  Tool,
} = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Fetch all appointment services with their associated services
      const appointmentServices = await AppointmentService.findAll({
        include: "service",
      });

      // Array to hold appointmentServiceTools data
      let appointmentServiceTools = [];

      // Iterate through each appointment service
      for (const appointmentService of appointmentServices) {
        // Fetch ServiceTools related to the service of the current appointmentService
        const serviceTools = await ServiceTool.findAll({
          where: { serviceId: appointmentService.serviceId },
        });

        // Create appointmentServiceTool entries for each ServiceTool
        for (const serviceTool of serviceTools) {
          // Fetch the tool associated with the current ServiceTool
          const tool = await Tool.findByPk(serviceTool.toolId);

          if (tool) {
            appointmentServiceTools.push({
              appointmentServiceId: appointmentService.id,
              toolId: tool.id,
              quantity: Math.floor(Math.random() * 10) + 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
      }

      // Bulk insert appointmentServiceTools
      await queryInterface.bulkInsert(
        "AppointmentServiceTools",
        appointmentServiceTools
      );
    } catch (error) {
      console.error("Error seeding AppointmentServiceTools:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Delete all appointmentServiceTools
    await queryInterface.bulkDelete("AppointmentServiceTools", null, {});
  },
};
