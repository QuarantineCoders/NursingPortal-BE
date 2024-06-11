"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint("Users", "username_2");
    await queryInterface.removeConstraint("Users", "username");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Users", {
      fields: ["username"],
      type: "unique",
      name: "username_2",
    });
    await queryInterface.addConstraint("Users", {
      fields: ["username"],
      type: "unique",
      name: "username",
    });
  },
};
