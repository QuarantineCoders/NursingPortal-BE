"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Appointment, Service } = require("../models");

    // Fetch appointment and service IDs
    const appointments = await Appointment.findAll({ attributes: ["id"] });
    const services = await Service.findAll({ attributes: ["id"] });

    const appointmentIds = appointments.map((appointment) => appointment.id);
    const serviceIds = services.map((service) => service.id);

    // appointments have multiple services, and each appointments has atleast one service
    const appointmentServices = [
      {
        appointmentId: appointmentIds[0],
        serviceId: serviceIds[0],
        createdAt: new Date("2022-06-18 07:47:44"),
        updatedAt: new Date("2022-06-18 07:47:44"),
      },
      {
        appointmentId: appointmentIds[0],
        serviceId: serviceIds[1],
        createdAt: new Date("2022-06-18 07:47:44"),
        updatedAt: new Date("2022-06-18 07:47:44"),
      },
      {
        appointmentId: appointmentIds[1],
        serviceId: serviceIds[2],
        createdAt: new Date("2022-06-16 07:07:44"),
        updatedAt: new Date("2022-06-16 07:07:44"),
      },
      {
        appointmentId: appointmentIds[1],
        serviceId: serviceIds[3],
        createdAt: new Date("2022-06-16 07:07:44"),
        updatedAt: new Date("2022-06-16 07:07:44"),
      },
      {
        appointmentId: appointmentIds[2],
        serviceId: serviceIds[4],
        createdAt: new Date("2022-06-14 06:27:44"),
        updatedAt: new Date("2022-06-14 06:27:44"),
      },
      {
        appointmentId: appointmentIds[2],
        serviceId: serviceIds[5],
        createdAt: new Date("2022-06-14 06:27:44"),
        updatedAt: new Date("2022-06-14 06:27:44"),
      },
      {
        appointmentId: appointmentIds[3],
        serviceId: serviceIds[6],
        createdAt: new Date("2022-06-12 05:47:44"),
        updatedAt: new Date("2022-06-12 05:47:44"),
      },
      {
        appointmentId: appointmentIds[3],
        serviceId: serviceIds[8],
        createdAt: new Date("2022-06-12 05:47:44"),
        updatedAt: new Date("2022-06-12 05:47:44"),
      },
      {
        appointmentId: appointmentIds[4],
        serviceId: serviceIds[5],
        createdAt: new Date("2022-06-10 05:07:44"),
        updatedAt: new Date("2022-06-10 05:07:44"),
      },
      {
        appointmentId: appointmentIds[4],
        serviceId: serviceIds[0],
        createdAt: new Date("2022-06-10 05:07:44"),
        updatedAt: new Date("2022-06-10 05:07:44"),
      },
      {
        appointmentId: appointmentIds[5],
        serviceId: serviceIds[7],
        createdAt: new Date("2022-06-08 04:27:44"),
        updatedAt: new Date("2022-06-08 04:27:44"),
      },
      {
        appointmentId: appointmentIds[6],
        serviceId: serviceIds[8],
        createdAt: new Date("2022-06-06 03:47:44"),
        updatedAt: new Date("2022-06-06 03:47:44"),
      },
      {
        appointmentId: appointmentIds[7],
        serviceId: serviceIds[9],
        createdAt: new Date("2022-06-04 03:07:44"),
        updatedAt: new Date("2022-06-04 03:07:44"),
      },
      {
        appointmentId: appointmentIds[7],
        serviceId: serviceIds[1],
        createdAt: new Date("2022-06-04 03:07:44"),
        updatedAt: new Date("2022-06-04 03:07:44"),
      },
      {
        appointmentId: appointmentIds[8],
        serviceId: serviceIds[2],
        createdAt: new Date("2022-06-02 02:27:44"),
        updatedAt: new Date("2022-06-02 02:27:44"),
      },
      {
        appointmentId: appointmentIds[9],
        serviceId: serviceIds[4],
        createdAt: new Date("2022-06-01 01:47:44"),
        updatedAt: new Date("2022-06-01 01:47:44"),
      },
    ];

    await queryInterface.bulkInsert(
      "AppointmentServices",
      appointmentServices,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
