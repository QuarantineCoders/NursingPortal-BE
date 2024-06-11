"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Payments", "paymentDate");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Payments", "paymentDate", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
