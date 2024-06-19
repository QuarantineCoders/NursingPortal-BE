"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tools", [
      {
        name: "Stethoscope",
        price: 50.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Blood Pressure Monitor",
        price: 80.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oxygen Tank",
        price: 100.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thermometer",
        price: 20.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wheelchair",
        price: 200.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "IV Pole",
        price: 70.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Syringe",
        price: 5.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gloves",
        price: 10.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bandages",
        price: 15.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Scalpel",
        price: 30.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tools", null, {});
  },
};
